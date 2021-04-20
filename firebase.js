import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBgzhndYRys8qEunFjYmsGNolEQViLr9ZM",
  authDomain: "kakaotalk-clone-2c1e8.firebaseapp.com",
  projectId: "kakaotalk-clone-2c1e8",
  storageBucket: "kakaotalk-clone-2c1e8.appspot.com",
  messagingSenderId: "372081206570",
  appId: "1:372081206570:web:3b334a23f4a6ce09b72a53",
  measurementId: "G-CTMJ57TS0T",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
