import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBBX5T824l3uYXAL-iNxrN3iZmzB1y1DmU",
  authDomain: "crwn-db-fe49a.firebaseapp.com",
  databaseURL: "https://crwn-db-fe49a.firebaseio.com",
  projectId: "crwn-db-fe49a",
  storageBucket: "",
  messagingSenderId: "371058406143",
  appId: "1:371058406143:web:26e9dbeaf191ae400452ca"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
