/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'
import { isObjectLike } from 'lodash';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        {/* Useful Hint: createBoard(...) */}
        let newBoard = [];
        let createdBoard = createBoard(boardSize, mineNum);
        for(let x = 0; x < boardSize; x++){
            let subCol = [];
            for(let y = 0; y < boardSize; y++){
                subCol.push({
                    value: createdBoard.board[x][y].value,                  
                    revealed: createdBoard.board[x][y].revealed,           
                    x: x,                       
                    y: y,                       
                    flagged: createdBoard.board[x][y].flagged,          
                });
            }
            newBoard.push(subCol);
        }
        setBoard(newBoard);

        let newMineLocations = [];
        for(let i  = 0; i < createdBoard.mineLocations.length; i++){
            newMineLocations.push(createdBoard.mineLocations[i]);
        }
        setMineLocations(newMineLocations);

        // print
        console.log("Current Board")
        console.log(boardSize)
        for(let x = 0; x < boardSize; x++){
            for(let y = 0; y < boardSize; y++){
                console.log(newBoard[x][y].value);
            }
        }
        console.log(newBoard[0][0])
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}
        
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        
    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        
    };

    return(
        <div className = 'boardPage' >
            <div className = 'boardWrapper' >
            {/* -- TODO 3-1 -- */}
            {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
            {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className='boardContainer'>
                    <Dashboard /> 
                    <div id='row0' style = {{display: 'flex'}} > 
                    <>
                    {/* {Cell({
                        rowIdx: 0,
                        colIdx: 0,
                        detail: board[0][0],
                        updateFlag: {updateFlag}, 
                        revealCell: {revealCell}
                    })} */}
                    </>
                    </div>
                </div>
            </div>
        </div>
    ); 

    //Cell({rowIdx, colIdx, detail, updateFlag, revealCell})

}

export default Board