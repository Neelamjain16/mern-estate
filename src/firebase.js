// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-20fac.firebaseapp.com",
  projectId: "mern-estate-20fac",
  storageBucket: "mern-estate-20fac.appspot.com",
  messagingSenderId: "632446721277",
  appId: "1:632446721277:web:807142e818e39b5b8c7294"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);