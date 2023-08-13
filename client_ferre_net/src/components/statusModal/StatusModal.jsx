import './StatusModal.css'
import React from 'react';

const StatusModal = ({reference, active, idItem, handleStatus, ...props}) => {

    return(
        <div ref={reference} className={`status-container ${active && 'active'}`} {...props}>

            <div className='options'>
                <div onClick={handleStatus} data-id={idItem} className='canceled'>Cancelado</div>
                <div onClick={handleStatus} data-id={idItem} className='progress'>Procesando</div>
                <div onClick={handleStatus} data-id={idItem} className='Onway'>En Camino</div>
                <div onClick={handleStatus} data-id={idItem} className='received'>Recibido</div>
            </div>
        
        </div>
    )
}

export default StatusModal;