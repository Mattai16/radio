// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import {getFirestore} from '@firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import {getMessaging} from "firebase/messaging"


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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
export const db = getFirestore(app);

 