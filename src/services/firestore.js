import * as firebase from "firebase/app";
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

// Set up firestore db const
const db = firebase.firestore();

// Set up firebase auth with google
const provider = new firebase.auth.GoogleAuthProvider();
//Authenticate with Firebase using the Google provider object.
export const authenticateGoogle = () => {
  return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      //var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      // Set username and profile picture
      //$("#userPicture").attr("src", user.photoURL);
      //$("#userName").text(user.displayName);
      //$("#userEmail").text(user.email);

      console.info("Authenticated user UID:", user.uid);
      console.info("Authenticated user email:", user.email);

      //userEmail = user.email;

    }).catch((error) => {
      // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
    });

}

export const createGroceryList = (userName, userId) => {
  return db.collection('groceryLists')
    .add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: userId,
      users: [{
        userId: userId,
        name: userName
      }]
    });
};

export const getGroceryList = groceryListId => {
  return db.collection('groceryLists')
    .doc(groceryListId)
    .get();
};

export const getGroceryListItems = groceryListId => {
  return db.collection('groceryLists')
    .doc(groceryListId)
    .collection('items')
    .get();
}

export const streamGroceryListItems = (groceryListId, observer) => {
  return db.collection('groceryLists')
    .doc(groceryListId)
    .collection('items')
    .orderBy('created')
    .onSnapshot(observer);
};

export const addUserToGroceryList = (userName, groceryListId, userId) => {
  return db.collection('groceryLists')
    .doc(groceryListId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion({
        userId: userId,
        name: userName
      })
    });
};

export const addGroceryListItem = (item, groceryListId, userId) => {
  return getGroceryListItems(groceryListId)
    .then(querySnapshot => querySnapshot.docs)
    .then(groceryListItems => groceryListItems.find(groceryListItem => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
    .then(matchingItem => {
      if (!matchingItem) {
        return db.collection('groceryLists')
          .doc(groceryListId)
          .collection('items')
          .add({
            name: item,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId
          });
      }
      throw new Error('duplicate-item-error');
    });
};
