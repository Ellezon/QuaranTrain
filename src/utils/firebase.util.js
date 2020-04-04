import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0pgjmHZ6blLGV2Q3RF1WHLMY92HiX4O0",
  authDomain: "quarantrain-e573f.firebaseapp.com",
  databaseURL: "https://quarantrain-e573f.firebaseio.com",
  projectId: "quarantrain-e573f",
  storageBucket: "quarantrain-e573f.appspot.com",
  messagingSenderId: "909692470264",
  appId: "1:909692470264:web:29ad1f195c6b19de8f0c0d",
}

firebase.initializeApp(firebaseConfig);

export default firebase;

export const db = firebase.firestore();

export const authentication = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
