import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDoc, doc,  query, orderBy  } from 'firebase/firestore';

// Initialize Firebase Admin SDK
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTY2HzHDFSwpQ5_jL58poZkUvQU14zXTI",
    authDomain: "johndevoflagos.firebaseapp.com",
    databaseURL: "https://johndevoflagos-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "johndevoflagos",
    storageBucket: "johndevoflagos.appspot.com",
    messagingSenderId: "1092406010478",
    appId: "1:1092406010478:web:9b59a088c22c44c9a0fc7f",
    measurementId: "G-DMPQ2K44QR"
  };
  

  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db, collection, addDoc, getDoc, doc, query, orderBy };