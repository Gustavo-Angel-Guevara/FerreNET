import React from 'react'

import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import './Modal.css'

const Modal = ({text, type, event, setDisplayModal, data, event2}) =>{
    
    return(
        <div className="container-modal">
            
            <div className={type == 'products-match' ? `modal data` : 'modal'}>
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
                        type === "products-match" ? 
                            <div>

                                <div className='products'>
                                    {data.map((el, index)=>{
                                        return (
                                            <article onClick={(e)=>{event2(index)}}>
                                                <div>
                                                    <p>Codigo:</p>
                                                    <p>{el.codigo}</p>
                                                </div>

                                                <div>
                                                    <p>Nombre:</p>
                                                    <p>{el.nombre}</p>
                                                </div>

                                                <div>
                                                    <p>Marca:</p>
                                                    <p>{el.marca}</p>
                                                </div>

                                                <div>
                                                    <p>Descripción:</p>
                                                    <p>{el.descripcion}</p>
                                                </div>

                                                <div>
                                                    <p>Precio Unitario:</p>
                                                    <p>{el.precio_unitario}</p>
                                                </div>
                                            </article>
                                        )
                                    })}
                                </div>

                                <div className='btns'>
                                    <ButtonPrimary label="Omitir" onClick={(e)=>setDisplayModal(false)}></ButtonPrimary>
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