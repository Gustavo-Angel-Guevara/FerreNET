import React from 'react';

const InputDate = ({label, ...props}) =>{
    

    return(
        <div className='input-container'>
            <label>{label}</label>
            <input {...props} type='date'/>
        </div>
    )
}

export default InputDate;