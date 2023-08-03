import React, { useEffect, useState } from 'react'
import MenuLeft from '../../components/Menu_Left/MenuLeft';

import './Order.css'
import Header from '../../components/Header/Header';

import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import Form from '../../components/Form/Form';
import Table from '../../components/Table/Table';
import ApiOrdenes from '../../services/ApiOrdenes';
import InputText from '../../components/Inputs/InputText';
import InputNumber from '../../components/Inputs/InputNumber/InputNumber';
import InputPrice from '../../components/Inputs/InputPrice/InputPrice';
import InputDate from '../../components/Inputs/InputDate/InputDate';
import InputSelect from '../../components/Inputs/InputSelect/InputDate';
import DateUtils from '../../utils/DateUtils';


let initDataForm = {id_producto:'', producto:'', cantidad:'0', especificaciones:'', status:'Enviado', fecha_creacion:new DateUtils().getCurrentDate() ,fecha_requerida:'', presupuesto_max:'$', proveedor_pref:''}

const Order = () =>{

    //Form's States
    const [display, setDisplay] = useState('')
    const [displayForm2, setDisplayForm2] = useState('')
    const [dataForm, setDataForm] = useState({id_producto:'', producto:'', cantidad:'0', especificaciones:'', status:'Enviado', fecha_creacion:new DateUtils().getCurrentDate() ,fecha_requerida:'', presupuesto_max:'$', proveedor_pref:''})
    const [newData, setNewData] = useState({})
    //
    const [ordes, setOrders] = useState([])

    useEffect(()=>{

        new ApiOrdenes().getOCs()
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            const data = json.data
            setOrders(data)
            console.log(data)
        })
        .catch(err=>{
            console.error(err)
        })
        
    }, [newData])


    const openForm = (numForm) =>{
        if(numForm === 1){
            setDisplay('active')
            setDataForm(initDataForm)
        }else if(numForm === 2){
            setDisplayForm2('active')
        }        
    }

    const closeForm = () => {
        setDisplay('')
        setDisplayForm2('')
    }

    const handleInputChange = (e) =>{
        console.log(e.target.name)
        setDataForm({
            ...dataForm,
            [e.target.name]:e.target.value
        })
    }

    const createOrder = () =>{
        
        let dataFormat = {...dataForm, presupuesto_max : dataForm.presupuesto_max.replace('$', '')}

        const settings = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(dataFormat)
        }

        let objApiOrdenes = new ApiOrdenes()
        objApiOrdenes.setSettings = settings

        objApiOrdenes.createOC()
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json=>{
            console.log(json)
            setNewData(json)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const updateOrder = () =>{
        let dataFormat = {...dataForm, presupuesto_max : dataForm.presupuesto_max.replace('$', '')}

        const settings = {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(dataFormat)
        }

        let objApiOrdenes = new ApiOrdenes()
        objApiOrdenes.setSettings = settings

        objApiOrdenes.createOC()
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json=>{
            console.log(json)
            setNewData(json)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const deleteOrder = (e) =>{

        console.log(e.target.dataset.id)

        let objApiOrdenes = new ApiOrdenes()
        objApiOrdenes.setId = e.target.dataset.id

        objApiOrdenes.deleteOC()
        .then(res => res ? res.json() : Promise.reject(res))
        .then(json=>{
            console.log(json)
            if(json.status === true){
                console.log("Orden de Compra Cancelada Correctamente")
                setNewData(json)
            }else{
                console.log("Error al Calcelar la Orden de Compra")
            }
        })
        .catch(err=>{
            console.log(err)
            console.log("Error Intento más Tarde")
        })

    }

    const openFormUpdateOrder = (e) =>{
        openForm(2)

        let objApiOrdenes = new ApiOrdenes()
        objApiOrdenes.setId = e.target.dataset.id

        objApiOrdenes.getOCById()
        .then(res=>res.ok?res.json():Promise(res))
        .then(json=>{
            const dataOrder = json.data[0]

            setDataForm(dataOrder)

        })
        .catch(err=>{
            console.log("Error al Obtener los datos del la orden")
        })

    }
    

    return(
        <div className='page'>
            
            <MenuLeft/>

            <div className='container-page'>
                <Header title={"Orden de Compra"}/>

                <div className='container'>

                
                    <div className='btn-content'>
                        <ButtonPrimary onClick={(e)=>openForm(1)} label={"Crear OC"} style={{width:'12rem', fontSize:'0.9rem'}}/>
                    </div>

                    {
                        ordes &&

                        <div className='table-container'>
                            <Table 
                            headerData={['Código', 'Producto', 'Creado', 'Cantidad', 'Status', 'Proveedor', 'Acciones']}
                            attr={['id_orden', 'producto', 'fecha_creacion', 'cantidad', 'status', 'proveedor_pref']}
                            rowData={ordes}
                            actions={"all"}
                            events = {{delete:deleteOrder, openFormUpdate:openFormUpdateOrder}}
                            ></Table>
                        </div>  
                    }
                                     


                </div> 

                <Form title={"Ordenar Compra"} display={display} closeForm={closeForm} name="Crear-OC">
                    <InputText label={"Nombre Producto"} name="producto" value={dataForm.producto} onChange={handleInputChange}/>
                    <InputNumber label={"Cantidad"} name="cantidad" value={dataForm.cantidad} onChange={handleInputChange} />
                    <InputText label={"Especificaciones Técnicas"} name="especificaciones" value={dataForm.especificaciones} onChange={handleInputChange}/>
                    <InputText label={"Justificación"}/>
                    <InputDate label={"Fecha Requerida"} name="fecha_requerida" value={dataForm.fecha_requerida} onChange={handleInputChange}/>
                    <InputPrice label={"Presupuesto"} name="presupuesto_max" value={dataForm.presupuesto_max} onChange={handleInputChange}/>
                    <InputSelect label={"Proveedor Preferido"} name="proveedor_pref" value={dataForm.proveedor_pref} onChange={handleInputChange}/>
                    <p className='extra-info'>La orden será solicitada y procesada por el departamento de compras</p>
                    <ButtonPrimary label={"Ordenar"} onClick={createOrder}/>
                </Form>    

                <Form title={"Actualizar Orden Compra"} display={displayForm2} closeForm={closeForm} name="Actualizar-OC">
                    <InputText label={"Nombre Producto"} name="producto" value={dataForm.producto} onChange={handleInputChange}/>
                    <InputNumber label={"Cantidad"} name="cantidad" value={dataForm.cantidad} onChange={handleInputChange} />
                    <InputText label={"Especificaciones Técnicas"} name="especificaciones" value={dataForm.especificaciones} onChange={handleInputChange}/>
                    <InputText label={"Justificación"}/>
                    <InputDate label={"Fecha Requerida"} name="fecha_requerida" value={dataForm.fecha_requerida} onChange={handleInputChange}/>
                    <InputPrice label={"Presupuesto"} name="presupuesto_max" value={dataForm.presupuesto_max} onChange={handleInputChange}/>
                    <InputSelect label={"Proveedor Preferido"} name="proveedor_pref" value={dataForm.proveedor_pref} onChange={handleInputChange}/>
                    <p className='extra-info'>La orden será solicitada y procesada por el departamento de compras</p>
                    <ButtonPrimary label={"Guardar"} onClick={updateOrder}/>
                </Form> 

            </div>


        </div>
    )
}

export default Order;