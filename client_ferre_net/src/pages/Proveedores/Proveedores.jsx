import React, { useContext, useEffect, useState } from 'react'
import MenuLeft from '../../components/Menu_Left/MenuLeft';
import Header from '../../components/Header/Header';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import Table from '../../components/Table/Table';
import ApiSuppliers from '../../services/ApiSuppliers';
import InputText from '../../components/Inputs/InputText';
import Form from '../../components/Form/Form';
import Modal from '../../components/Modal/Modal';

import Context from '../../context/Interface';


let initDataForm = {idproveedor:'', nombre:'', correo:'', telefono:'', direccion:'', sitio_web:''}


const Proveedores = ()=>{

    const [proveedores, setProveedores] = useState([])
    const [display, setDisplay] = useState('')
    const [displayForm2, setDisplayForm2] = useState('')
    const [dataForm, setDataForm] = useState(initDataForm)
    const [newData, setNewData] = useState({})

    const [displayModal, setDisplayModal] = useState(false)
    const [idProv, setIdProv] = useState()

    const {menuHide} = useContext(Context);

    useEffect(()=>{
        let objApiSuppliers = new ApiSuppliers()

        objApiSuppliers.getSuppliers()
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(json => Promise.reject(json));
            }
        })
        .then(json =>{
            setProveedores(json.data)
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
        setDataForm({
            ...dataForm,
            [e.target.name]:e.target.value
        })
    }

    const createProveedor = () =>{
        
        const settings = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(dataForm)
        }

        let objApiOrdenes = new ApiSuppliers()
        objApiOrdenes.setSettings = settings

        objApiOrdenes.createSupplier()
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json=>{
            console.log(json)
            setNewData(json)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const deleteAction = (e) =>{
        setIdProv(e.target.dataset.id)
        setDisplayModal(true)
    }

    const deleteProveedor = (e) =>{
        const objApiSuppliers = new ApiSuppliers()
        objApiSuppliers.setId = idProv;

        objApiSuppliers.deleteSupplier()
        .then(res => res.ok ? res.json() : Promise(res))
        .then(json=>{
            setNewData(json)
            setDisplayModal(false)
        })
        .catch(err=>{
            console.log("Error al Eliminar el Proveedor")
        })
    }

    const update = (e) =>{

        let settings = {
            method : 'PUT',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataForm)
        }

        let objApiSuppliers = new ApiSuppliers()
        objApiSuppliers.setId = e.target.dataset.id
        objApiSuppliers.setSettings = settings

        objApiSuppliers.updateSupplier()
        .then(res => res.ok ? res.json() : Promise(res))
        .then(json => {
            setNewData(json)
            console.log("Proveedor Actualizado")
        })
        .catch(err=>{
            console.log("Error al actualizar proveedores")
        })

    }

    const openFormUpdateProveedor = (e) =>{
        openForm(2)

        let objApiSuppliers = new ApiSuppliers()
        objApiSuppliers.setId = e.target.dataset.id

        objApiSuppliers.getSuppliersById()
        .then(res=>res.ok?res.json():Promise(res))
        .then(json=>{
            const dataOrder = json.data[0]
            console.log(dataOrder)
            setDataForm(dataOrder)

        })
        .catch(err=>{
            console.log("Error al Obtener los datos del Proveedor")
        })
    }

    return(
        <div className={`page ${menuHide && 'active'}`}>
            {displayModal &&
                <Modal text="¿Desea Eliminar este Registro?" type="delete" event = {deleteProveedor} setDisplayModal = {setDisplayModal}/>
            }
            <MenuLeft/>

            <div className='container-page'>
                <Header title={"Proveedores"}/>

                <div className='container'>
                    <div className='btn-content'>
                        <ButtonPrimary label={"Nuevo Proveedor"} onClick={(e)=>openForm(1)} style={{width:'12rem', fontSize:'0.9rem'}}/>
                    </div>

                    <div className='table-container'>
                            <Table 
                            headerData={['ID', 'Nombre', 'Correo', 'Telefono', 'Dirección', 'Sitio Web', 'Acciones']}
                            attr={['idproveedor', 'nombre', 'correo', 'telefono', 'direccion', 'sitio_web']}
                            rowData={proveedores}
                            actions={"all"}
                            events = {{delete : deleteAction, openFormUpdate : openFormUpdateProveedor}}
                            ></Table>
                    </div>  

                </div>

                <Form title={"Agregar Proveedor"} display={display} closeForm={closeForm} name="Agregar Proveedor">
                    <InputText label={"Nombre"} name="nombre" value={dataForm.nombre} onChange={handleInputChange}/>
                    <InputText label={"Correo"} name="correo" value={dataForm.correo} onChange={handleInputChange}/>
                    <InputText label={"Telefono"} name="telefono" value={dataForm.telefono} onChange={handleInputChange}/>
                    <InputText label={"Dirección"} name="direccion" value={dataForm.direccion} onChange={handleInputChange}/>
                    <InputText label={"Sitio Web"} name="sitio_web" value={dataForm.sitio_web} onChange={handleInputChange}/>
                    <ButtonPrimary label={"Guardar"} onClick={createProveedor}/>
                </Form>  

                <Form title={"Agregar Proveedor"} display={displayForm2} closeForm={closeForm} name="Actualizar Proveedor">
                    <InputText label={"Nombre"} name="nombre" value={dataForm.nombre} onChange={handleInputChange}/>
                    <InputText label={"Correo"} name="correo" value={dataForm.correo} onChange={handleInputChange}/>
                    <InputText label={"Telefono"} name="telefono" value={dataForm.telefono} onChange={handleInputChange}/>
                    <InputText label={"Dirección"} name="direccion" value={dataForm.direccion} onChange={handleInputChange}/>
                    <InputText label={"Sitio Web"} name="sitio_web" value={dataForm.sitio_web} onChange={handleInputChange}/>
                    <ButtonPrimary label={"Guardar"} onClick={update}/>
                </Form>

            </div>

        </div>
    )
}

export default Proveedores;