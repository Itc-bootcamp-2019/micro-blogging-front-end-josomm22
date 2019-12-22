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
import Login from './pages/login'

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
        {/* <Login/> */}
      </div>
    </Router>
  );
}

export default App;
