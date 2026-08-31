importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAhQ8pFMvyjWi3ps6A93Iu0oL-3XNkNMTM",
  authDomain: "crm-demo-44944.firebaseapp.com",
  projectId: "crm-demo-44944",
  storageBucket: "crm-demo-44944.firebasestorage.app",
  messagingSenderId: "638716276808",
  appId: "1:638716276808:web:07de915dd8528a0697a87d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("INCOMING BACKGROUND NOTIFICATION RECEIVED:", payload);
  if (payload.notification) {
    return;
  }

  const notificationTitle = payload.data?.title || 'New Notification';
  const notificationOptions = {
    body: payload.data?.message || payload.data?.body || '',
    icon: '/favicon.svg',
    data: payload.data || {},
    requireInteraction: true
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
