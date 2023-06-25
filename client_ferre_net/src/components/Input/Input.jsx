import React from 'react';
import './Input.css'

const Input = ({label, ...props}) =>{
    return(
        <div className='input-container'>
            <label>{label}</label>
            <input {...props}/>
        </div>
    )
}

export default Input;