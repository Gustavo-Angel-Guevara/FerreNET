
import cancel from '../../assets/icon/cancel_icon.png'
import edit from '../../assets/icon/edit_icon.png'
import delete_icon from '../../assets/icon/delete_icon.png'


const Row = ({data, actions, events}) =>{
    return(
        <div className="table-row">

            {
                data &&
                    data.map((el, index)=>{
                        if(el === "Enviado"){
                            return <div key={index} className="table-cell">{el}</div>
                        }else{
                            return <div key={index} className="table-cell">{el}</div>
                        }
                    })
            }
            
            {actions === 'cancel' ?
                <div className="table-cell actions">
                    <img src={cancel} alt="" />
                </div>
            
            :
            data &&
                <div className="table-cell actions-all">
                    <img data-id={data[1]} src={edit} alt="Editar" onClick={events.openFormUpdateOrder}/>
                    <img data-id={data[1]}  src={delete_icon} alt="Eliminar" onClick={events.deleteOrder}/>
                </div>
            }

        </div>
    )
}

export default Row;