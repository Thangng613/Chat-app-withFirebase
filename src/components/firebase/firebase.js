// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";

// import firebase

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEEHePX3K6JfkM0Ri9II-bBohki52_MNk",
  authDomain: "chatt-app-a43b0.firebaseapp.com",
  projectId: "chatt-app-a43b0",
  storageBucket: "chatt-app-a43b0.appspot.com",
  messagingSenderId: "367840008712",
  appId: "1:367840008712:web:a3633bc026fd2438444fbd",
  measurementId: "G-LV67MSSG8Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

// connectAuthEmulator(auth, "http://localhost:9099");
// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }
