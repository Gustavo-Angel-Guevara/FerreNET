import React from 'react'

import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import './Modal.css'

const Modal = ({text, type, event, setDisplayModal}) =>{
    
    return(
        <div className="container-modal">
            
            <div className='modal'>
                <h3>{text}</h3>
                
                {
                    type &&
                        type === "delete" ? 
                            <div className='btns'>
                                <ButtonPrimary label="Cancelar" onClick={(e)=>setDisplayModal(false)}></ButtonPrimary>
                                <ButtonPrimary label="Eliminar" style={{backgroundColor: "var(--color-warning)"}} onClick={event}></ButtonPrimary>
                            </div>
                        :
                        type === "delete-noAskAgain" ? 
                            <div>
                                <div className='btns'>
                                    <ButtonPrimary label="Cancelar" onClick={(e)=>setDisplayModal(false)}></ButtonPrimary>
                                    <ButtonPrimary label="Eliminar" style={{backgroundColor: "var(--color-warning)"}} onClick={event}></ButtonPrimary>
                                </div>
                                <div className='check'>
                                    <input type="checkbox" name="" id="checkInput" onChange={(e)=>{localStorage.setItem('deleteModal', e.target.checked)}}/>
                                    <label htmlFor="checkInput">No preguntar de Nuevo</label>
                                </div>
                            </div>
                        :
                        type === "info-noAskAgain" ? 
                            <div>
                                <div className='btns'>
                                    <ButtonPrimary label="Entiendo" onClick={(e)=>setDisplayModal(false)}></ButtonPrimary>
                                </div>
                                <div className='check'>
                                    <input type="checkbox" name="" id="checkInput" onChange={(e)=>{localStorage.setItem('warnModalResposive', e.target.checked)}}/>
                                    <label htmlFor="checkInput">No Mostrar de Nuevo</label>
                                </div>
                            </div>
                        :
                            null
                }

            </div>

        </div>
    )
}

export default Modal;