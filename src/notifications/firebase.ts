import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, deleteToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export const deleteCurrentToken = async () => {
  try {
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      return false;
    }
    return await deleteToken(messaging);
  } catch (err) {
    return false;
  }
};

export const requestForToken = async () => {
  try {
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

    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      return null;
    }

    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/"
    });

    const readyRegistration = await navigator.serviceWorker.ready;

    const currentToken = await getToken(messaging, {
      vapidKey: vapidKey,
      serviceWorkerRegistration: readyRegistration,
    });

    return currentToken || null;
  } catch (err) {
    return null;
  }
};

export const onMessageListener = (callback: any) => {
  return onMessage(messaging, (payload) => {
    console.log("🔥 Notification Received:", payload);
    callback(payload);
  });
};