import React,{useState, useEffect} from 'react';
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
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";
import config from './config'



function App() {

const [isLoggedin, setIsLoggedin] = useState(false);

useEffect(()=>{
  firebase.auth().onAuthStateChanged(function(user) {
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

    <FirebaseAuthProvider {...config} firebase={firebase}>
      <Router>
        <div className="App">
        <h2>{isLoggedin}</h2>
          <Navbar />
            <FirebaseAuthConsumer>
              <Switch>
                <Route path="/profile">
                  {!isLoggedin ? <Redirect to="/Signin" />: <Profile />}
                </Route>
                <Route exact path="/">
                {!isLoggedin ? <Redirect to="/Signin" />: <Messages />}
                </Route>
                <Route path="/Signin">
                {isLoggedin ? <Redirect to="/" />:<SignInScreen/>}
                </Route>
              </Switch>
            </FirebaseAuthConsumer>
        </div>
      </Router>
    </FirebaseAuthProvider>
  );
}

export default App;
