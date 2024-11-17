import { initializeApp , getApp, getApps} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCElqqOMvXXtVUmlViSMB1zih0JkPIhJtg",
  authDomain: "gachasavior-f5987.firebaseapp.com",
  projectId: "gachasavior-f5987",
  storageBucket: "gachasavior-f5987.appspot.com",
  messagingSenderId: "808578213083",
  appId: "1:808578213083:web:64e380c73e56772298d8fe"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to local')
  })
  .catch((error) => {
    console.error('Error setting persistence:', error)
  })

export { app, db, auth };