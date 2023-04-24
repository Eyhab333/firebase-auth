// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9-D1WsKOjwcC8XQKm4EpvzHjLEgbKM1c",
  authDomain: "learn-auth-afcc9.firebaseapp.com",
  projectId: "learn-auth-afcc9",
  storageBucket: "learn-auth-afcc9.appspot.com",
  messagingSenderId: "185926518412",
  appId: "1:185926518412:web:6dd521f578980098fddda9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);