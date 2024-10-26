// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);