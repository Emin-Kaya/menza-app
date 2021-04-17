// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({ 'messagingSenderId': '352164880147' });
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
firebase.initializeApp({
    apiKey: "AIzaSyDE2CMdIzsvBRV1doVqkmzMFhNHEsFuBYE",
    authDomain: "menza-3c68d.firebaseapp.com",
    databaseURL: "https://menza-3c68d.firebaseio.com",
    projectId: "menza-3c68d",
    storageBucket: "menza-3c68d.appspot.com",
    messagingSenderId: "352164880147",
    appId: "1:352164880147:web:e19492462577105aa084e6",
    measurementId: "G-JXHTMDL8ZY"
})

const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return registration.showNotification(notificationTitle,
        notificationOptions);
});
// [END background_handler]
