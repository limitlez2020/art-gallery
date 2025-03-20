// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD45mB-bvHXzoM4HxG1ad68ptK1SCAlF7M",
  authDomain: "art-gallery-a228c.firebaseapp.com",
  projectId: "art-gallery-a228c",
  storageBucket: "art-gallery-a228c.firebasestorage.app",
  messagingSenderId: "275270671232",
  appId: "1:275270671232:web:c4eb7610cc3c3ad7a9bf65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };