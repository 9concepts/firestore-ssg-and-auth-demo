import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const config: FirebaseOptions = {
  apiKey: "AIzaSyCXYqnjyhqSJuPDXZR3RC3H5re5S4QeSL0",
  authDomain: "firestore-learning-202210.firebaseapp.com",
  projectId: "firestore-learning-202210",
  storageBucket: "firestore-learning-202210.appspot.com",
  messagingSenderId: "744002096487",
  appId: "1:744002096487:web:af21e81880fddb865ff3c2",
  measurementId: "G-MF4FRSH9TT",
};

const emulatorHost = "localhost";
const firestorePort = 8080;

export const createFirebaseClientApp = () => {
  if (!getApps().length) {
    initializeApp(config);

    if (process.env.NODE_ENV === "development") {
      const db = getFirestore();
      connectFirestoreEmulator(db, emulatorHost, firestorePort);

      const auth = getAuth();
      connectAuthEmulator(auth, "http://localhost:9099");
    }
  }
};
