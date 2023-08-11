import './MenuProfile.css'

const MenuProfile = ({reference, active, ...props}) => {
    
    return(
        <div ref={reference} className={`menu-profile-container ${active && 'active'}`} {...props}>

            <div className='info-user'>
                <p>Nombre Apellidos</p>
                <p>#USIE9283</p>
            </div>
        
            <nav>
                <ul>
                    <li>Cerrar Sesión</li>
                </ul>
            </nav>
        </div>
    )
}

export default MenuProfile;