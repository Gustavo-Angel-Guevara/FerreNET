import React from 'react';
import './InputSelect.css'

const InputSelect = ({label, options, value, ...props}) =>{
    
    return(
        <div className='input-container'>
            <label>{label}</label>
            <select {...props} value={value}>
                <option value="">--- Selecciona Una Opción ---</option>
                
                {
                    options ?
                        options.map(option=>{
                            return <option value={option.id}>{option.text}</option>
                        })
                    :
                        <option value="2">Proveedor 2</option>
                }

            </select>
        </div>
    )
}

export default InputSelect;