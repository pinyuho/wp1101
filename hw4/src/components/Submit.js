import React, { useState } from 'react';


function Submit (props) {

    const [name, setName] = useState('');
    //setName('newwww');


    function handleSubmit(e) {
        if (name === '') {
            alert('You did not type anything!');
            e.preventDefault();
            return;
        }
        e.preventDefault();
        props.addTask(name); // callback props
        setName('');
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input className={props.className} 
                   placeholder={props.placeholder}
                   value={name}
                   onChange={handleChange} />
        </form>
    );
}

export default Submit;