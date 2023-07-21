import React, { useState } from "react";
import MenuLeft from '../../components/Menu_Left/MenuLeft';
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";



const History = ()=>{

    const [History, setHistory] = useState(true)

    return(
        <div className="page">
            <MenuLeft/>
            <div className='container-page'>
                <Header title={"Historial de Movimientos"}/>

                
                <div className='container'>
                    {
                        History &&

                        <div className='table-container'>
                            <Table 
                            headerData={['Código', 'Movimiento', 'Fecha', 'Hora', 'Usuario']}
                            attr={['codigo', 'movimiento', 'fecha', 'hora', 'usuario']}
                            rowData={[{codigo:1, movimiento:"Creo una orden de compra", fecha:"2023-07-16", hora:"10:00 PM", usuario:"37829"}, {codigo:1, movimiento:"Creo una orden de compra", fecha:"2023-07-16", hora:"10:00 PM", usuario:"37829"}, {codigo:1, movimiento:"Creo una orden de compra", fecha:"2023-07-16", hora:"10:00 PM", usuario:"37829"}, {codigo:1, movimiento:"Creo una orden de compra", fecha:"2023-07-16", hora:"10:00 PM", usuario:"37829"}]}
                            ></Table>
                        </div>  
                    }                                    
                </div> 

            </div>
        </div>
    )
}

export default History;