import React from 'react';
import './InputSelect.css'

const InputSelect = ({label, options, ...props}) =>{
    

    return(
        <div className='input-container'>
            <label>{label}</label>
            <select {...props} name="" id="">
                <option value="">--- Selecciona Una Opción ---</option>

                {
                    options &&
                    options.map(option=>{
                        return <option value={option.id}>{option.text}</option>
                    })
                }

            </select>
        </div>
    )
}

export default InputSelect;