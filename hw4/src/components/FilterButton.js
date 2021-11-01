import React, { useState } from 'react';

function FilterButton(props) {

    function handleClick(e) {
        props.setFilter(e.target.value);
    }

    if (props.isPressed) {
        return ( 
            <button onClick={handleClick}
                    value={props.name} 
                    id="clickedButton">
                {props.name} 
            </button>
        );
    }
    return ( 
        <button onClick={handleClick}
                value={props.name} >
            {props.name} 
        </button>
    );
    
}

export default FilterButton;