import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCElqqOMvXXtVUmlViSMB1zih0JkPIhJtg",
  authDomain: "gachasavior-f5987.firebaseapp.com",
  projectId: "gachasavior-f5987",
  storageBucket: "gachasavior-f5987.appspot.com",
  messagingSenderId: "808578213083",
  appId: "1:808578213083:web:64e380c73e56772298d8fe",
  measurementId: "G-ZZV17G23QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);