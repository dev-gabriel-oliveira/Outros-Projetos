// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG6MftFDpTfUHLoLSHx3X_YSD3Wdc0eE8",
  authDomain: "dyli-841c7.firebaseapp.com",
  projectId: "dyli-841c7",
  storageBucket: "dyli-841c7.appspot.com",
  messagingSenderId: "806327805056",
  appId: "1:806327805056:web:72b7a53ba2a4d6fd05f265",
  measurementId: "G-TMYGJG4H1G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);