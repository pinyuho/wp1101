import React, { useState } from 'react';

function Button (props) {

    function lastIsNumber(str) {
        return /\d/.test(str.slice(-1));
    }

    function handleClick() {
        let updatedStr = "";
        if (props.type === "equal") {
            try {
                updatedStr = eval(props.toCalStr);
                console.log(eval(props.toCalStr));
            } catch (e) {
                console.log(e);
                updatedStr = "error";
            }
            
        }
        else if (props.type === "operands") {
            updatedStr = lastIsNumber(props.toCalStr) 
                ? (props.toCalStr + props.name)
                : props.toCalStr.replace(/.$/, props.name);
        }
        else {
            updatedStr = props.toCalStr + props.name;
        }
        props.setToCalStr(updatedStr);
    }

    return ( 
        <button key={props.name}
                onClick={handleClick}
                name={props.name}>
            {props.name} 
        </button>
    );
}

export default Button;