// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA2DaNwp0H7fhRantPaSlU6APbzEftSv-8",
  authDomain: "appointmentcaller-3b3d2.firebaseapp.com",
  projectId: "appointmentcaller-3b3d2",
  storageBucket: "appointmentcaller-3b3d2.firebasestorage.app",
  messagingSenderId: "248148065520",
  appId: "1:248148065520:web:6ba5df760edba6ca609635"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);