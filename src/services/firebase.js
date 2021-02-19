import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialise Firebase
firebase.initializeApp(firebaseConfig);

// Set up firestor and auth const
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Set up firebase auth with google
const provider = new firebase.auth.GoogleAuthProvider();

//Authenticate with Firebase using the Google provider object
export const signInWithGoogle = () => {
  return firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */

    // The signed-in user info.
    var user = result.user;
    console.info("Authenticated user UID:", user.uid);
    console.info("Authenticated user email:", user.email);

  }).catch((error) => {
    // Handle Errors here.
  });
};
