import React, { useState } from 'react';
import x_icon from '../img/x.png';

function Todo(props) {

    function handleOnClick (e) {
        props.removeTask(props.id);
    }

    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input type="checkbox" 
                       id={props.id} 
                       checked={props.completed} 
                       htmlFor={props.id}
                       onChange={() => 
                       props.toggleTaskCompleted(props.id)}/>
                <label htmlFor={props.id}></label>
            </div>
            <h1 className="todo-app__item-detail">
                {props.completed 
                    ? <label> {props.name} </label>
                    : <>{props.name}</>}
            </h1>
            <img src={x_icon} 
                 className="todo-app__item-x" 
                 onClick={handleOnClick}/>
        </li> 
    );
}

export default Todo;