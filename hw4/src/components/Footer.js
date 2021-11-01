import React, { useState } from 'react';

function Footer (props) {

    if (props.isDisplay) {

        function handleClick(e) {
            props.clearCompleted();
        }

        return (
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total"> {props.text} </div>
                <ul className="todo-app__view-buttons">
                    {props.filterList}
                </ul>

            { props.showClearButton 
                ? (<div className="todo-app__clean"> 
                    <button onClick={handleClick}> Clear Completed </button>
                   </div>)
                : null
            }
                
            </footer> 
        );
    }
    return null;
}

export default Footer;