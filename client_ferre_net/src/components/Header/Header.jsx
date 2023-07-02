import profile from '../../assets/images/profile.png';
import notification from '../../assets/icon/notification.png';
import './Header.css'


const Header = ({title})=>{
    return(
        <div className='header'>
            <div>
                <p>{title}</p>
            </div>

            <div className='right'>
                <img className='notification' src={notification} alt="" />

                <figure>
                    <img src={profile} alt="" />
                </figure>
            </div>
        </div>
    )
}

export default Header;