import React from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './Components/Messages'
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Messages/>
    </div>
  );
}

export default App;
