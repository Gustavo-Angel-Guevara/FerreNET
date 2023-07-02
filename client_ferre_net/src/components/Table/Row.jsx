
import cancel from '../../assets/icon/cancel_icon.png'
import edit from '../../assets/icon/edit_icon.png'
import delete_icon from '../../assets/icon/delete_icon.png'


const Row = ({data, actions}) =>{
    return(
        <div class="table-row">

            {
                data &&
                    data.map(el=>{
                        return <div class="table-cell">{el}</div>
                    })
            }
            
            {actions === 'cancel' ?
                <div class="table-cell actions">
                    <img src={cancel} alt="" />
                </div>
            
            :

                <div class="table-cell actions-all">
                    <img src={edit} alt="" />
                    <img src={delete_icon} alt="" />
                </div>

            }

        </div>
    )
}

export default Row;