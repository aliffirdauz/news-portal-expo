import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAt-zYwLxzbJ2sYrDxTB3tk9vnl0fnwEcU",
  authDomain: "friday-jastpl.firebaseapp.com",
  databaseURL: "https://friday-jastpl.firebaseio.com",
  projectId: "friday-jastpl",
  storageBucket: "friday-jastpl.appspot.com",
  messagingSenderId: "784440502434",
  appId: "1:784440502434:web:18b2851dd81131fa654ffb"
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