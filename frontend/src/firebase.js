// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_URL,
    authDomain: "real-estate-7f02c.firebaseapp.com",
    projectId: "real-estate-7f02c",
    storageBucket: "real-estate-7f02c.appspot.com",
    messagingSenderId: "442943978593",
    appId: "1:442943978593:web:7fdd8bdfece3f90ee27e20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);