
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgFuB7iUUz2klthpO2xRGW8dbOHH-1uN8",
  authDomain: "goaspace-6e52c.firebaseapp.com",
  projectId: "goaspace-6e52c",
  storageBucket: "goaspace-6e52c.firebasestorage.app",
  messagingSenderId: "930863346741",
  appId: "1:930863346741:web:c621aa4d1ae18921072d7c",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
