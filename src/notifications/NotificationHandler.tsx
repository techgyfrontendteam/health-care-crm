import React, { useEffect, useRef } from 'react';
import { requestForToken, deleteCurrentToken, getMessagingInstance } from './firebase';
import { onMessage } from 'firebase/messaging';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useRegisterDeviceMutation, useDeviceHeartbeatMutation } from './notificationsSlice';

export const NotificationHandler: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const authToken = useSelector((state: RootState) => state.auth.token);
  const registeredTokenRef = useRef<string | null>(null);
  const [registerDevice] = useRegisterDeviceMutation();
  const [deviceHeartbeat] = useDeviceHeartbeatMutation();

  useEffect(() => {
    let heartbeatInterval: ReturnType<typeof setInterval> | undefined;
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    const setupNotifications = async () => {
      if (!isAuthenticated || !authToken) {
        if (registeredTokenRef.current || localStorage.getItem('last_registered_fcm_token')) {
          await deleteCurrentToken();
          localStorage.removeItem('last_registered_fcm_token');
          localStorage.removeItem('last_registered_user_id');
          registeredTokenRef.current = null;
        }
        return;
      }

      if (registeredTokenRef.current === authToken) {
        return;
      }
      registeredTokenRef.current = authToken;

      const fcmToken = await requestForToken();
      if (!isMounted) return;

      if (fcmToken) {
        let deviceId = localStorage.getItem('fcm_device_id');

        if (!deviceId) {
          const hash = fcmToken.split('').reduce((acc: number, char: string) => {
            return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
          }, 0);

          const stableId = Math.abs(hash).toString(36);
          deviceId = `web_${stableId}`;
          localStorage.setItem('fcm_device_id', deviceId);
        }

        const lastRegisteredToken = localStorage.getItem('last_registered_fcm_token');
        const lastRegisteredUser = localStorage.getItem('last_registered_user_id');
        const needsRegistration = fcmToken !== lastRegisteredToken || (Boolean(user?.id) && user?.id !== lastRegisteredUser);

        // Heartbeat commented out to prevent periodic refresh and unnecessary deviceHeartbeat calls
        /*
        const sendHeartbeat = async () => {
          try {
            await deviceHeartbeat({
              device_id: deviceId,
              platform: 'web'
            }).unwrap();
          } catch (error) {
          }
        };
        */

        if (needsRegistration) {
          try {
            await registerDevice({
              device_id: deviceId,
              fcm_token: fcmToken,
              platform: 'web'
            }).unwrap();

            localStorage.setItem('last_registered_fcm_token', fcmToken);
            if (user?.id) {
              localStorage.setItem('last_registered_user_id', user.id);
            }
          } catch (error) {
            registeredTokenRef.current = null;
          }
        }

        // Periodic heartbeat commented out as requested
        // await sendHeartbeat();
        // heartbeatInterval = setInterval(sendHeartbeat, 5 * 60 * 1000);
      } else {
        registeredTokenRef.current = null;
      }
    };

    setupNotifications();

    // Safely setup onMessage only if messaging is supported
    getMessagingInstance().then((messaging) => {
      if (!messaging || !isMounted) return;

      unsubscribe = onMessage(messaging, (payload) => {
        console.log("🔥 INCOMING FOREGROUND NOTIFICATION RECEIVED:", payload);

        const title =
          payload?.data?.title ||
          payload?.notification?.title ||
          "New Message";

        const body =
          payload?.data?.message ||
          payload?.data?.body ||
          payload?.notification?.body ||
          "";

        toast.info(title, {
          description: body,
        });

        if (document.visibilityState === "hidden" && "Notification" in window && Notification.permission === "granted") {
          try {
            new Notification(title, {
              body: body,
              icon: "/favicon.svg",
              data: payload.data || {}
            });
          } catch (e) {
          }
        }

        const detail = {
          id: Date.now(),
          title,
          body,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        window.dispatchEvent(new CustomEvent("push_notification_received", { detail }));
        window.dispatchEvent(new Event("new_message_received"));
      });
    }).catch(() => {});

    return () => {
      isMounted = false;
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isAuthenticated, authToken, user?.id]);

  return null;
};
