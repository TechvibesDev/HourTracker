import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDEqcd9qFqOJIYC1p0eAiVCbhHpGDsDEws",
    authDomain: "hourtracker-b0541.firebaseapp.com",
    projectId: "hourtracker-b0541",
    storageBucket: "hourtracker-b0541.appspot.com",
    messagingSenderId: "274646317278",
    appId: "1:274646317278:android:a39ceb3da0ce387dd02a4f",
    measurementId: "G-VXP7ZNMHH9"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });
const storage = getStorage(app);
const firestore = getFirestore(app);
export { db, auth, firestore ,storage};