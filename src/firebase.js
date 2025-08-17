import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'; // ✅ Full Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDqHG0Il0_IOLDGYNCB49_0Fh_pQIvvd14",
  authDomain: "protfolio-540a2.firebaseapp.com",
  projectId: "protfolio-540a2",
  storageBucket: "protfolio-540a2.firebasestorage.app",
  messagingSenderId: "737443379893",
  appId: "1:737443379893:web:a49c6f606f0250e699dcfc",
  measurementId: "G-06GX1N2D5K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // pass app here too
export const db = getFirestore(app);
export const storage = getStorage(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
