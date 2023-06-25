import React from 'react';
import './ButtonPrimary.css'

const ButtonPrimary = ({label, ...props}) => {

    return(
        <button className='btn-primary' {...props}>
            {label}
        </button>
    )
}

export default ButtonPrimary;