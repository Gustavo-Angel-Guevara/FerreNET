import React from 'react';
import './InputNumber.css'

const InputNumber = ({label, ...props}) =>{
    
    const handleKeyPress = (e) => {
        console.log(e.keyCode)
        if (e.keyCode === 69 || e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 190) {
          e.preventDefault();
        }
    };

    return(
        <div className='input-container'>
            <label>{label}</label>
            <input type='number' {...props} onKeyDown={handleKeyPress}/>
        </div>
    )
}

export default InputNumber;