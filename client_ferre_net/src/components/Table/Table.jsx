import Header from './Header';
import Row from './Row';

import './Table.css'

const Table = ({headerData, rowData, actions, events}) =>{
    return(
        <div className="table">
            <Header data={headerData}></Header>

            {
                rowData && 
                rowData.map((data, index)=>{

                    return <Row
                        key={index} 
                        data={[data.idorden, data.id_orden, data.producto, data.fecha_creacion, data.cantidad, data.status, data.proveedor_pref]}
                        actions={actions}
                        events = {events}
                    ></Row>
                    
                })
            }          

            

        </div>
    )
}


export default Table;