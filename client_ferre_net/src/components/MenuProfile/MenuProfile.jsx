import './MenuProfile.css'
import React from 'react';
import { Link } from 'react-router-dom'

const MenuProfile = ({reference, active, ...props}) => {
    
    return(
        <div ref={reference} className={`menu-profile-container ${active && 'active'}`} {...props}>

            <div className='info-user'>
                <p>Nombre Apellidos</p>
                <p>#USIE9283</p>
            </div>
        
            <nav>
                <ul>
                    <Link to="/login">
                        <li>Cerrar Sesión</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}

export default MenuProfile;