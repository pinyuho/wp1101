import React, { useState } from 'react';
import './App.css';
import Button from '../components/Button'


const BUTTONS = {
  'operands': ['+', '-', '*', '/'],
  'numbers': [7, 8, 9, 
              4, 5, 6,
              1, 2, 3,
              0],
  'dot': '.',
  'equal': '='
};

const BUTTON_TYPES = Object.keys(BUTTONS);

const brNums = [9, 6, 3];


function App() {

  const [toCalStr, setToCalStr] = useState("0");

  const operandList = BUTTONS.operands.map(operand => (
    <Button key={operand}
            name={operand} 
            type="operands"
            toCalStr={toCalStr}
            setToCalStr={setToCalStr}/>
  ));

  const numberList = BUTTONS.numbers.map(number => {
    return brNums.find(element => element === number) >= 0 ?
      <>
      <Button key={number}
              name={number} 
              type="numbers"
              toCalStr={toCalStr}
              setToCalStr={setToCalStr}/> <br/>
      </>
    : <Button key={number}
              name={number} 
              type="numbers"
              toCalStr={toCalStr}
              setToCalStr={setToCalStr}/>
    }
  );


  return (
    <div className="App">
        <h1 className="App-display"> {toCalStr} </h1>
        <span className="App-controls">
            {operandList} <br/>
            {numberList}
            <Button key="."
                    name="."
                    type="dot"
                    toCalStr="{toCalStr}"
                    setToCalStr={setToCalStr}/>
            <Button key="="
                    name="="
                    type="equal" 
                    toCalStr={toCalStr}
                    setToCalStr={setToCalStr}/>
        </span>
    </div>

  );
}

export default App;
