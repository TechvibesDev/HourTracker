import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyA7GYn0wUx8v8-JabtRXcxwmxOcWOca-6k",
    authDomain: "hourtracker-b0541.firebaseapp.com",
    projectId: "hourtracker-b0541",
    storageBucket: "hourtracker-b0541.appspot.com",
    messagingSenderId: "274646317278",
    appId: "1:274646317278:web:3a61b8ee0fc60882d02a4f",
    measurementId: "G-6PGR4VYMG2"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });
const storage = getStorage(app);
const firestore = getFirestore(app);
export { db, auth, firestore, storage };