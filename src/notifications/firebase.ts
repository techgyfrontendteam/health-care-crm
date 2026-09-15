import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getMessaging, getToken, deleteToken, onMessage, isSupported, type Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Safely check and initialize analytics if supported
if (typeof window !== "undefined") {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      try {
        getAnalytics(app);
      } catch {
        // Ignore analytics initialization errors
      }
    }
  }).catch(() => {});
}

export let messaging: Messaging | null = null;
let messagingChecked = false;

export const getMessagingInstance = async (): Promise<Messaging | null> => {
  if (messaging) return messaging;
  if (messagingChecked) return null;

  try {
    if (
      typeof window === "undefined" ||
      !window.isSecureContext ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !("Notification" in window)
    ) {
      messagingChecked = true;
      return null;
    }

    const supported = await isSupported().catch(() => false);
    if (!supported) {
      messagingChecked = true;
      return null;
    }

    messaging = getMessaging(app);
    messagingChecked = true;
    return messaging;
  } catch (err) {
    console.warn("Firebase Messaging is not supported in this environment:", err);
    messagingChecked = true;
    return null;
  }
};

export const deleteCurrentToken = async () => {
  try {
    const msg = await getMessagingInstance();
    if (!msg) {
      return false;
    }
    return await deleteToken(msg);
  } catch (err) {
    return false;
  }
};

export const requestForToken = async () => {
  try {
    const msg = await getMessagingInstance();
    if (!msg) {
      return null;
    }

    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      return null;
    }

    let permission = Notification.permission;
    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      return null;
    }

    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      return null;
    }

    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/"
    });

    const readyRegistration = await navigator.serviceWorker.ready;

    const currentToken = await getToken(msg, {
      vapidKey: vapidKey,
      serviceWorkerRegistration: readyRegistration,
    });

    return currentToken || null;
  } catch (err) {
    console.warn("Failed to retrieve FCM token:", err);
    return null;
  }
};

export const onMessageListener = async (callback: (payload: any) => void) => {
  const msg = await getMessagingInstance();
  if (!msg) return () => {};
  return onMessage(msg, (payload) => {
    console.log("🔥 Notification Received:", payload);
    callback(payload);
  });
};
