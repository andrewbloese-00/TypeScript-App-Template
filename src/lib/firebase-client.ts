// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDZKda581fMsKYNOiVHW0O_U4OmqNJmWY4",
  authDomain: "xvape-d78e0.firebaseapp.com",
  projectId: "xvape-d78e0",
  storageBucket: "xvape-d78e0.appspot.com",
  messagingSenderId: "217352932491",
  appId: "1:217352932491:web:0b9623061eb745efded88e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)


