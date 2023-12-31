

import './Form.css'
import close from '../../assets/icon/close_icon.png'

const Form = ({children, title, closeForm, display, ...props}) =>{

    return(
        <div className={`form-container ${display}`} {...props}>
            <div className='flex'>
                <h3>{title}</h3>
                <img onClick={closeForm} className='close' src={close} alt="" />
            </div>
            
            <div className='inputs'>
                {children}
            </div>

        </div>
    )
}

export default Form;