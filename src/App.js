import React from 'react';
import './App.css';
import Messages from './Components/Messages'
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useRouteMatch,
  useParams
} from "react-router-dom";

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
