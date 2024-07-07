import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxb0TfRxh7SVT4SkmzTUg_1ocvT3X7SxM",
  authDomain: "theboatdb.firebaseapp.com",
  projectId: "theboatdb",
  storageBucket: "theboatdb",
  messagingSenderId: "605338871192",
  appId: "1:605338871192:web:859eb09ca44e621b0377ed",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
