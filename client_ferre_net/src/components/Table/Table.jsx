import Header from './Header';
import Row from './Row';

import './Table.css'

const Table = ({headerData, rowData, actions, events, attr}) =>{
    return(
        <div className="table">
            <Header data={headerData}></Header>
            {
                rowData && 
                rowData.map((data, index)=>{

                    const rowDataArr = attr.map(attr=>data[attr]);

                    return <Row
                        key={index} 
                        data={rowDataArr}
                        actions={actions}
                        events = {events}
                    ></Row>
                    
                })
            }          

            

        </div>
    )
}


export default Table;