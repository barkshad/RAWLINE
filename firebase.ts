
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBuvCPjVz_NGOhbCyS7doOE1L6DkzQBHc",
  authDomain: "rawline-7b60c.firebaseapp.com",
  projectId: "rawline-7b60c",
  storageBucket: "rawline-7b60c.firebasestorage.app",
  messagingSenderId: "243225493014",
  appId: "1:243225493014:web:b3e7487a436ffa5ac2ff37",
  measurementId: "G-B8H5G783QZ"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, db };
