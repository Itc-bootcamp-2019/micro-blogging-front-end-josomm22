import React from 'react';
import './App.css';
import Messages from './Components/Messages'
import Navbar from './Components/Navbar';
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
    <div className="App">
      <Navbar/>
      <Messages/>
    </div>
  );
}

export default App;
