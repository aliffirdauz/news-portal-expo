import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhoqP_OFIrUB5wcL6ap0EeIEZgblkvAw8",
  authDomain: "news-portal-ac370.firebaseapp.com",
  projectId: "news-portal-ac370",
  storageBucket: "news-portal-ac370.appspot.com",
  messagingSenderId: "718274836",
  appId: "1:718274836:web:14e777568e3908a8f78201",
  measurementId: "G-RN8WJ4JXNN"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

const firestore = firebase.firestore()

export { auth, firestore };