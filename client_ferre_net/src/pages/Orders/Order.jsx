import React, { useState } from 'react'
import MenuLeft from '../../components/Menu_Left/MenuLeft';

import './Order.css'
import Header from '../../components/Header/Header';

import ButtonPrimary from '../../components/Input/ButtonPrimary/ButtonPrimary';
import Form from '../../components/Form/Form';
import InputForms from '../../components/Input/InputForms';
import Table from '../../components/Table/Table';


const Order = () =>{

    const [display, setDisplay] = useState('')

    const openForm = () =>{
        setDisplay('active')
    }

    const closeForm = () => {
        setDisplay('')
    }

    return(
        <div className='page'>
            
            <MenuLeft/>

            <div className='container-page'>
                <Header title={"Orden de Compra"}/>

                <div className='container'>

                
                    <div className='btn-content'>
                        <ButtonPrimary onClick={openForm} label={"Crear OC"} style={{width:'12rem', fontSize:'0.9rem'}}/>
                    </div>

                    <div className='table-container'>
                        <Table 
                            headerData={['ID', 'Producto', 'Creado', 'Cantidad', 'Status', 'Total', 'Proveedor', 'Acciones']}
                            rowData={[
                                ['OC-00001', 'Producto Nombre', '26 Jun 2023', '10 Unidades', 'Enviado', '$2438.46', 'Nombre del Proveedor'],
                                ['OC-00001', 'Producto Nombre', '26 Jun 2023', '10 Unidades', 'Enviado', '$2438.46', 'Nombre del Proveedor'],
                                ['OC-00001', 'Producto Nombre', '26 Jun 2023', '10 Unidades', 'Enviado', '$2438.46', 'Nombre del Proveedor']
                            ]}
                            actions={"all"}
                            ></Table>
                    </div>                   


                </div> 

                <Form title={"Ordenar Producto"} display={display} closeForm={closeForm}>
                    <InputForms label={"Nombre Producto"}/>
                    <InputForms label={"Cantidad"}/>
                    <InputForms label={"Especificaciones Técnicas"}/>
                    <InputForms label={"Justificación"}/>
                    <InputForms label={"Fecha Requerida"}/>
                    <InputForms label={"Presupuesto"}/>
                    <InputForms label={"Proveedor Preferido"}/>
                    <p className='extra-info'>La orden será solicitada y procesada por el departamento de compras</p>
                    <ButtonPrimary label={"Ordenar"}/>
                </Form>     

            </div>


        </div>
    )
}

export default Order;