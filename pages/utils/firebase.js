// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC-aEJyPEXFRN5oOjvLTgSiAjmnmDoJVo",
  authDomain: "insomnia-50eb1.firebaseapp.com",
  projectId: "insomnia-50eb1",
  storageBucket: "insomnia-50eb1.appspot.com",
  messagingSenderId: "843907863197",
  appId: "1:843907863197:web:6651b4a2e979143011ba74",
  measurementId: "G-VDM12FKRL7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
