
import './Input_forms.css'

const InputText = ({label, ...props}) =>{
    return(
        <div className='input-container'>
            <label htmlFor="">{label}</label>
            <input {...props} />
        </div>
    )
}


export default InputText;