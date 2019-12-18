import React from 'react';
import './App.css';
import Messages from './pages/Message'
import Navbar from './Components/Navbar';
import Profile from './pages/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import firebase from 'firebase';

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

function App() {
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route exact path = "/">
            <Messages />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
