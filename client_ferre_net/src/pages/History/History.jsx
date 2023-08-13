import React, { useContext, useState } from "react";
import MenuLeft from '../../components/Menu_Left/MenuLeft';
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";

import Context from '../../context/Global';


const History = ()=>{

    const [History, setHistory] = useState(true)

    const {menuHide} = useContext(Context);

    return(
        <div className={`page ${menuHide && 'active'}`}>
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