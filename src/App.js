import React, { useState, useEffect } from 'react';
import './App.css';
import Messages from './pages/Message'
import Navbar from './Components/Navbar';
import Profile from './pages/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// import Login from './pages/login'
import "firebase/auth";
import SignInScreen from '../src/firebaseui';
import * as firebase from 'firebase/app';



function App() {

  const [isLoggedin, setIsLoggedin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setIsLoggedin(true)
        return isLoggedin
      } else {
        // No user is signed in.
        setIsLoggedin(false)
        return isLoggedin
      }
    })
  });

  return (

    <Router>
      <div className="App">
        <Navbar />
        {isLoggedin !== null && (
          <Switch>
            <Route path="/profile">
              {!isLoggedin ? <Redirect to="/Signin" /> : <Profile />}
            </Route>
            <Route exact path="/">
              {!isLoggedin ? <Redirect to="/Signin" /> : <Messages />}
            </Route>
            <Route path="/Signin">
              {isLoggedin ? <Redirect to="/" /> : <SignInScreen />}
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
