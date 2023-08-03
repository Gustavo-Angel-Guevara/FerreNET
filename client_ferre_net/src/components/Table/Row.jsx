
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
            (data && events) &&
                <div className="table-cell actions-all">
                    <img data-id={data[0]} src={edit} alt="Editar" onClick={events.openFormUpdate}/>
                    <img data-id={data[0]}  src={delete_icon} alt="Eliminar" onClick={events.delete}/>
                </div>
            }

        </div>
    )
}

export default Row;