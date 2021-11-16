import React, { useState } from 'react';
import './App.css';

function App() {

  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  function handleStart(e) {
    setHasStarted(true);
  }

  function handleGuess(e) {
    console.log("here");
  }

  const startMenu = (
    <div>
      <button onClick={handleStart}> start game </button>
    </div>
  )

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input   // Get the value from input
      ></input>
      <button  // Send number to backend
        onClick={handleGuess}
        disabled={!number}>guess!</button> 
      <p>{status}</p>
    </>
  )

  const winningMode = (
    <>
      <p>You won! The number was {number}.</p>
      <button> restart </button>
    </>
  )


  const game = (
    <div>
      {hasStarted ? gameMode : winningMode}
    </div>
  )


  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
