import profile from '../../assets/images/profile.png';
import notification from '../../assets/icon/notification.png';
import './Header.css'
import MenuProfile from '../MenuProfile/MenuProfile';
import { useEffect, useRef, useState } from 'react';
import Eventos from '../../utils/Eventos';


const Header = ({title})=>{

    const [coord, setCoord] = useState({top:'0px', left:'0px', bottom:'0px', right:'0px'})
    const [activeMenuProfile, setActiveMenuProfile] = useState(false)
    const menuProfile = useRef(null);

    useEffect(()=>{
        document.addEventListener('click', handleOutsideClick)
    
        return ()=>{
          document.removeEventListener('click', handleOutsideClick)
        }
    })

    const handleOutsideClick = (e) =>{
        if(!e.target.matches('img') && !e.target.matches('.menu-profile-container') && !e.target.matches('.menu-profile-container *')){
            setActiveMenuProfile(false)
        }
    }
    
    const onClick = (e) =>{
        setActiveMenuProfile(!activeMenuProfile)
        let objEvents = new Eventos(false);
        objEvents.setComponentToDisplay = menuProfile.current
        objEvents.setComponent = e
        objEvents.displayAComponent();
        let coords = objEvents.getCoord
        setCoord({top:coords.top || '0px', left:coords.left || '0px', bottom:coords.bottom || '0px', right:coords.right || '0px'})
    }

    return(
        <div className='header'>

            <MenuProfile reference={menuProfile} active={activeMenuProfile} style={{...coord}}/>
            
            <div>
                <p>{title}</p>
            </div>

            <div className='right'>
                <img className='notification' src={notification} alt="" />

                <figure onClick={onClick}>
                    <img src={profile} alt="" />
                </figure>
            </div>
        </div>
    )
}

export default Header;