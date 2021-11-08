import React, { useState } from 'react';

function Button (props) {

    const ops = ['+', '-', '*', '/', '.'];
    const allButtons = ['+', '-', '*', '/', '.', '=', 'AC',
                        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    function handleClick() {
        let updatedStr = "";
        if (props.name === "=") {
            try {
                let value = eval(props.toCalStr).toString();
                if (value === 'Infinity' || value === '-Infinity' || value === 'NaN') {
                    updatedStr = "error";
                }
                else {
                    updatedStr = (Math.round(value * 100000) / 100000).toString();
                    console.log("value");
                    console.log(value);
                }
            } catch (e) {
                console.log(e);
                updatedStr = "error";
            }
            
        }
        else if (props.name === "AC") {
            console.log("pressed AC");
            updatedStr = "";
        }
        else if (props.name === "DEL") {
            if (props.toCalStr !== ""){
                updatedStr = props.toCalStr.substring(0, props.toCalStr.length - 1);
            }
        }
        else if (props.name === "MC") {
            console.log(props.toCalStr);
            if (!props.toCalStr.includes(ops)){
                props.setMC(parseInt(props.toCalStr, 10));
                updatedStr = props.toCalStr;
                console.log("MCCC");
                console.log(props.mc);
            }
            else {
                updatedStr = props.toCalStr + props.mc.toString();
                console.log("MC");
                console.log(props.mc);
                console.log(updatedStr);
            }
            
        }
        else if (props.name === "+/-") {
            if (props.toCalStr !== ""){
                updatedStr = props.toCalStr * (-1);
            }
        }
        else if (ops.includes(props.name) && props.toCalStr === "" ) {
            updatedStr = "";
        }
        else if (ops.includes(props.name) && ops.includes(props.toCalStr.slice(-1))) {
            updatedStr = props.toCalStr.slice(0, -1) + props.name;
        }
        else if (props.toCalStr.includes("error") && ops.includes(props.name)) {
            updatedStr = "";
        }
        else if (props.toCalStr.includes("error")) {
            updatedStr = props.name;
        }
        else {
            updatedStr = props.toCalStr + props.name;
            console.log(updatedStr);
        }

        props.setToCalStr(updatedStr.toString());
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