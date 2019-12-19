import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNbwUom_HFNkM6UdKG6JCwBvXZatjyTHg",
  authDomain: "micro-blog-josomm22.firebaseapp.com",
  databaseURL: "https://micro-blog-josomm22.firebaseio.com",
  projectId: "micro-blog-josomm22",
  storageBucket: "micro-blog-josomm22.appspot.com",
  messagingSenderId: "898340409721",
  appId: "1:898340409721:web:9bdd2721eccbd9f6d15fa8",
  measurementId: "G-NHZC7FHX0R"
};
firebase.initializeApp(firebaseConfig);

export default firebase;