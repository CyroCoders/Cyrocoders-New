// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getFirestore, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"

const app = initializeApp({
    apiKey: "AIzaSyBWSQN_POGcgiiRy_FS0oB62l26Uth9HGE",
    authDomain: "cyrocoders-learn.firebaseapp.com",
    projectId: "cyrocoders-learn",
    storageBucket: "cyrocoders-learn.appspot.com",
    messagingSenderId: "207854820836",
    appId: "1:207854820836:web:2ddf94245fe00cce5e7bf1",
    measurementId: "G-NZEP3J40W2"
});
const db = getFirestore();

export { app, db, doc, collection, getDocs, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };