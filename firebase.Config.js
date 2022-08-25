// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARtnCOxxZoGce95I33tkuKkV_95MbwGcU",
  authDomain: "my-nextjs-project-aa9a1.firebaseapp.com",
  projectId: "my-nextjs-project-aa9a1",
  storageBucket: "my-nextjs-project-aa9a1.appspot.com",
  messagingSenderId: "891678366515",
  appId: "1:891678366515:web:d263759edfe803885c7c46"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);