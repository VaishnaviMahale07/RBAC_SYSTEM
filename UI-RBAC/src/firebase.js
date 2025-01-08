// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5r9wNnZXwfzsCsWEMcVSZHmgLP1puP_Y",
    authDomain: "chat-app-62c91.firebaseapp.com",
    projectId: "chat-app-62c91",
    storageBucket: "chat-app-62c91.firebasestorage.app",
    messagingSenderId: "179322934271",
    appId: "1:179322934271:web:681063455f28e4c6870dca",
    measurementId: "G-4ER1TYKE4X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
export const storage = getStorage();