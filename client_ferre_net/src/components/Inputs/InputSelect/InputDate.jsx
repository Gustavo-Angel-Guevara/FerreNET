import React from 'react';
import './InputSelect.css'

const InputSelect = ({label, options, ...props}) =>{
    

    return(
        <div className='input-container'>
            <label>{label}</label>
            <select {...props}>
                <option value="">--- Selecciona Una Opción ---</option>
                <option value="1">Proveedor 1</option>
                <option value="2">Proveedor 2</option>

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