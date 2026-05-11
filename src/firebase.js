import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkya136h8bOZvum2H8FrMQ2pqVNdh4r_U",
  authDomain: "work15-todo.firebaseapp.com",
  projectId: "work15-todo",
  storageBucket: "work15-todo.firebasestorage.app",
  messagingSenderId: "287055981828",
  appId: "1:287055981828:web:ac63c428e0e2bcb0ed3451"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);