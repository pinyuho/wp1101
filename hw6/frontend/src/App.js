import React, { useState } from 'react';
import './App.css';
import { guess, startGame, restart, set } from './axios'

function App() {

  // Define state
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [hasResult, setResult] = useState(false);
  const [hasSetCode, setHasSetCode] = useState(false);
  const [code, setCode] = useState('');
  const [settedCode, setSettedCode] = useState('');
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStart = async (e) => {
    let obj = await startGame()
    console.log(obj)

    if(obj.msg.startsWith('Error')){
      setErrorMsg(obj.msg)
    } else {
      setErrorMsg('')
      setHasStarted(true)
    }
  }

  const handleRestart = async (e) => {
    let obj = await restart()
    console.log(obj)
    if(obj.msg.startsWith('Error')){
      setErrorMsg(obj.msg)
    } else {
      setErrorMsg('')

      setHasWon(false)
      setResult(false)
      setHasSetCode(false)
      setCode('')
      setStatus('')
    }
  }

  const handleSet = async () => {
    const obj = await set(code); // FIXME
    console.log(obj)

    if(obj.msg.startsWith('Error')){
      setErrorMsg(obj.msg)
    } else {
      setErrorMsg('')

      setCode('')
      setHasSetCode(true)
      setStatus(obj.msg)
    }
  }

  function handleChange(e) {
    setCode(e.target.value)
  }

  const handleGuess = async () => {
    const obj = await guess(code);
    // console.log("response: ")
    console.log(obj)

    if(obj.msg.startsWith('Error')){
      setErrorMsg(obj.msg)
    } else {
      setErrorMsg('')
      
      if (obj.msg.startsWith('4A0B')) {
        setResult(true)
        setHasWon(true)
      } else if (obj.computerWon) {
        setResult(true)
        setSettedCode(obj.settedCode)
      } else {
        setStatus(obj.msg)
        setCode('')
      }
    }
  }

  




  // Define 3 different views
  const startMenu = (
    <div>
      <button onClick={handleStart}> start game </button>
      <p>{errorMsg}</p>
    </div>
  )

  const setMode = (
    <>
      <p> Input a 4 digit number for computer to guess (ex. 0001) </p>
      <input value={code} onChange={handleChange}></input>
      <button onClick={handleSet} disabled={!code}>set code</button> 
      <p>{status}</p>
      <p>{errorMsg}</p>
    </>
  )

  const guessMode = (
    <>
      <p>Guess a 4 digit number (ex. 0001)</p>
      <input value={code} onChange={handleChange}></input>
      <button  onClick={handleGuess} disabled={!code}>guess!</button> 
      <p>{status}</p>
      <p>{errorMsg}</p>
    </>
  )

  const loseMode = (
    <>
      <p>You lose! The computer guessed your code = {settedCode}</p>
      <button onClick={handleRestart}> restart </button>
      <p>{errorMsg}</p>
    </>
  )

  const winMode = (
    <>
      <p>You won! The code was {code}.</p>
      <button onClick={handleRestart}> restart </button>
      <p>{errorMsg}</p>
    </>
  )
  // End defining views

  // main html

  const gameMode = (
    <div>
      { hasSetCode ? guessMode : setMode }
    </div>
  )

  const resultMode = (
    <div>
      { hasWon ? winMode : loseMode }
    </div>
  )

  const game = (
    <div>
      { hasResult ? resultMode : gameMode }
    </div>
  )

  return (
    <div className="App">
      { hasStarted ? game : startMenu }
    </div>
  );
}

export default App;
