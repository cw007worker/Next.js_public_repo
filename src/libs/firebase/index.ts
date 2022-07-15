import firebase from 'firebase/app';
import { firebaseConfig } from './config';

import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth;

export { auth };
