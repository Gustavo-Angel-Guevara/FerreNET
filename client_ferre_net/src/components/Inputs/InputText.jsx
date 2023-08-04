
import './Input_forms.css'

const InputText = ({label, style_container, ...props}) =>{
    return(
        <div className='input-container' style={style_container}>
            <label htmlFor="">{label}</label>
            <input {...props} />
        </div>
    )
}


export default InputText;