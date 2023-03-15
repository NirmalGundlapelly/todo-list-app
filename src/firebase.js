import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0b91Qmj_1-8cH4wMV5JreotEzZwkcPHg",
  authDomain: "todo-list-app-f1b66.firebaseapp.com",
  databaseURL:
    "https://todo-list-app-f1b66-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-list-app-f1b66",
  storageBucket: "todo-list-app-f1b66.appspot.com",
  messagingSenderId: "1074166605408",
  appId: "1:1074166605408:web:f89b26c7279405a6488505",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
