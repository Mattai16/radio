importScripts("https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js")

const firebaseConfig = {
  apiKey: "AIzaSyB5zKs1mkh4wQ7iBZH8rsv-OLfQS9ifRCU",
  authDomain: "back-end-radio.firebaseapp.com",
  projectId: "back-end-radio",
  storageBucket: "back-end-radio.appspot.com",
  messagingSenderId: "947106617831",
  appId: "1:947106617831:web:068009caf93d5f3ccbc542",
  measurementId: "G-QFPWEK3JEH"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    console.log("Msj off");
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png"
    }

    return self.registration.showNotification(
        notificationTitle.
        notificationOptions
    )
}) 