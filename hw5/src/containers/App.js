import React, { useState } from 'react';
import './App.css';
import Button from '../components/Button'


const BUTTONS = {
  'operands': ['+', '-', '*', '/', 'AC', '+/-', 'MC', 'DEL'],
  'numbers': [7, 8, 9, 
              4, 5, 6,
              1, 2, 3,
              0],
};

const brNums = [9, 6, 3];

function App() {

  const [toCalStr, setToCalStr] = useState("");
  const [mc, setMC] = useState(0);

  const operandList = BUTTONS.operands.map(operand => (
    <Button key={operand}
            name={operand} 
            toCalStr={toCalStr}
            setToCalStr={setToCalStr}
            mc={mc}
            setMC={setMC}/>
  ));

  const numberList = BUTTONS.numbers.map(number => {
    return brNums.find(element => element === number) >= 0 ?
      <>
      <Button key={number}
              name={number} 
              toCalStr={toCalStr}
              setToCalStr={setToCalStr}
              mc={mc}
              setMC={setMC}/> <br/>
      </>
    : <Button key={number}
              name={number} 
              toCalStr={toCalStr}
              setToCalStr={setToCalStr}
              mc={mc}
              setMC={setMC}/>
    }
  );


  return (
    <div className="App">
        <h1 className="App-display"> {toCalStr || "0"} </h1>
        <span className="App-controls">
            {operandList} <br/>
            
            {numberList}
            <Button key="."
                    name="."
                    toCalStr={toCalStr}
                    setToCalStr={setToCalStr}
                    mc={mc}
                    setMC={setMC}/>
            <Button key="="
                    name="="
                    toCalStr={toCalStr}
                    setToCalStr={setToCalStr}
                    mc={mc}
                    setMC={setMC}/>
        </span>
    </div>

  );
}

export default App;
