import firebase from 'firebase/app';
import 'firebase/firestore';
import config from './config'

const firebaseConfig = config

firebase.initializeApp(firebaseConfig);

export default firebase;