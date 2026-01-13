// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCce3C4QQapf5dzAjacUdLKfaGXiIr-iQc",
  authDomain: "mineboard.firebaseapp.com",
  projectId: "mineboard",
  storageBucket: "mineboard.firebasestorage.app",
  messagingSenderId: "2280061636",
  appId: "1:2280061636:web:d1af20cb2376ca9d85a791",
  measurementId: "G-BBWXRRMK7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);