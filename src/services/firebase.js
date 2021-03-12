import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialise Firebase and setting up firestore and auth for use later
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

// Authenticate with Firebase-auth using the Google provider object
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
export function SignInWithGoogle() {
  auth.signInWithPopup(provider);
}

// Firestore operations

// Create new campaign
export function createCampaign(campaign, owner) {
  return db.collection('campaigns').doc(campaign).set({ owner: owner });
}

// Create new character
export function createCharacter(
  campaign,
  charaName,
  owner,
  dwClass,
  alignment,
  race,
  raceAttribute
) {
  return db
    .collection('campaigns')
    .doc(campaign)
    .collection('characters')
    .doc(charaName)
    .set({
      abilities: [
        { category: 'STR', score: '1', affliction: 'Unafflicted' },
        { category: 'DEX', score: '1', affliction: 'Unafflicted' },
        { category: 'CON', score: '1', affliction: 'Unafflicted' },
        { category: 'INT', score: '1', affliction: 'Unafflicted' },
        { category: 'WIS', score: '1', affliction: 'Unafflicted' },
        { category: 'CHA', score: '1', affliction: 'Unafflicted' },
      ],
      alignment: alignment,
      armour: '',
      backstory: '',
      bonds: [{ bond: '' }],
      class_features: [{ feature: '', checkbox: false }],
      dw_class: dwClass,
      full_name: '',
      funds: '',
      hp: '',
      items: [
        {
          name: '',
          description: '',
          type: '',
          range: '',
          cost: '',
          weight: '',
          uses: '',
          tags: [],
        },
      ],
      level: '',
      look: '',
      owner: owner,
      race: race,
      race_attribute: raceAttribute,
      xp: '',
    });
}
// Save Character
export function saveCharacter(campaign, character, data) {
  return db
    .collection('campaigns')
    .doc(campaign)
    .collection('characters')
    .doc(character)
    .set(data);
}

// Stream Campaign Data (all Campaigns)
export function streamCampaigns(observer) {
  return db.collection('campaigns').onSnapshot(observer);
}

// Stream Character Data (all Characters)
export function streamCharacters(campaign, observer) {
  return db
    .collection('campaigns')
    .doc(campaign)
    .collection('characters')
    .onSnapshot(observer);
}

// Stream Character Data (selected Characters)
export function streamCharacter(campaign, character, observer) {
  return db
    .collection('campaigns')
    .doc(campaign)
    .collection('characters')
    .doc(character)
    .onSnapshot(observer);
}

// Delete Campaign
export function deleteCampaign(campaign) {
  return db.collection('campaigns').doc(campaign).delete();
}

// Delete Characters
export function deleteCharacter(campaign, character) {
  return db
    .collection('campaigns')
    .doc(campaign)
    .collection('characters')
    .doc(character)
    .delete();
}

// Default Export
export default firebase;
