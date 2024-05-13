// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxtWbUFYBuCGEmg4UX5GH0iVqZRKVYvM8",
  authDomain: "eskino-project.firebaseapp.com",
  projectId: "eskino-project",
  storageBucket: "eskino-project.appspot.com",
  messagingSenderId: "1085144039471",
  appId: "1:1085144039471:web:d1f8d8f7873ea9c00606da",
  measurementId: "G-EG1K315NW8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
