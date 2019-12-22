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
// import Login from './pages/login'
import "firebase/auth";
import SignInScreen from '../src/firebaseui';
import * as firebase from 'firebase/app';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import config from './config'


function App() {
  return (

    <FirebaseAuthProvider {...config} firebase={firebase}>
      <Router>
        <div className="App">
          <Navbar />
          <IfFirebaseUnAuthed>
            <SignInScreen />
          </IfFirebaseUnAuthed>
          <IfFirebaseAuthed>

            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route exact path="/">
                <Messages />
              </Route>
            </Switch>
         

        {/* <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button> */}
      </IfFirebaseAuthed>
      </div>
        </Router>








    </FirebaseAuthProvider>

  );
}

export default App;
