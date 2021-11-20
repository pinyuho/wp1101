import React, { useState } from 'react';
import './App.css';
import { guess, startGame, restart } from './axios'

function App() {

  // Define state
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');


  const handleStart = async (e) => {
    let obj = await startGame()
    console.log(obj)
    setHasStarted(true)
  }

  const handleRestart = async (e) => {
    let obj = await restart()
    console.log(obj)
    setHasWon(false)
    setNumber('')
    setStatus('')
  }

  function handleChange(e) {
    setNumber(e.target.value)
  }

  const handleGuess = async () => {
    const obj = await guess(number);
    console.log("response: ")
    console.log(obj)

    if (obj.msg === 'Equal') {
      setHasWon(true)
    }
    else {
      setStatus(obj.msg);
      setNumber('')
    }
  }

  




  // Define 3 different views
  const startMenu = (
    <div>
      <button onClick={handleStart}> start game </button>
    </div>
  )

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input value={number} onChange={handleChange} // Get the value from input
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
      <button onClick={handleRestart}> restart </button>
    </>
  )
  // End defining views

  // main html
  const game = (
    <div>
      {hasWon ? winningMode : gameMode }
    </div>
  )

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
