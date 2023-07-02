
import cancel from '../../assets/icon/cancel_icon.png';
import Header from './Header';
import Row from './Row';

import './Table.css'

const Table = ({headerData, rowData, actions}) =>{
    return(
        <div class="table">
            <Header data={headerData}></Header>

            {
                rowData && 
                rowData.map(data=>{
                    return <Row 
                        data={data}
                        actions={actions}
                    ></Row>
                })
            }          

            

        </div>
    )
}


export default Table;