import React from 'react';
import logo from './logo.svg';
import './App.css';
import Showoff from './Showoff';
import Navbar from "./navbar/Navbar";
import Button from "./common/Button";

function App() {
  return (
    <>
      <div className="App">
        <Navbar/>
        <h1>Musify</h1>
        
        <Button text="Roboka"></Button>
        <p>
          WIP
          Roboka Édenkertje legjobbasd
        </p>
      </div>
    </>
  );
}

export default App;
