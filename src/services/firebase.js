import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialise Firebase and setting up firestore and auth for use later
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
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

// Authenticate with Firebase-auth using the Google provider object
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export function SignInWithGoogle() { auth.signInWithPopup(provider)};

// Firestore operations
export function createCharacter(campaign, character) {
    return db.collection("campaigns")
        .doc(campaign)
        .collection("characters")
        .add(character);
};

export function getCharacters(campaign) {
    return db.collection("campaigns")
        .doc(campaign)
        .collection("characters")
        .get();
};

export function getCharacter(campaign,character) {
    return db.collection("campaigns")
        .doc(campaign)
        .collection("characters")
        .doc(character)
        .get();
};

export function streamGroceryListItems(groceryListId, observer) {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .orderBy('created')
        .onSnapshot(observer);
};

// Default Export
export default firebase;
