import React, { useEffect, useState } from 'react'
import MenuLeft from '../../components/Menu_Left/MenuLeft';
import Header from '../../components/Header/Header';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import Table from '../../components/Table/Table';
import ApiSuppliers from '../../services/ApiSuppliers';
import InputText from '../../components/Inputs/InputText';
import InputNumber from '../../components/Inputs/InputNumber/InputNumber';
import Form from '../../components/Form/Form';

let initDataForm = {idproveedor:'', nombre:'', correo:'', telefono:'', direccion:'', sitioWeb:''}


const Proveedores = ()=>{

    const [proveedores, setProveedores] = useState([])
    const [display, setDisplay] = useState('')
    const [displayForm2, setDisplayForm2] = useState('')
    const [dataForm, setDataForm] = useState(initDataForm)


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


    }, [])

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

    const deleteProveedor = (e) =>{

    }

    const openFormUpdateProveedor = (e) =>{

    }

    return(
        <div className='page'>
            <MenuLeft/>

            <div className='container-page'>
                <Header title={"Orden de Compra"}/>

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
                            events = {{deleteProveedor, openFormUpdateProveedor}}
                            ></Table>
                    </div>  

                </div>

                <Form title={"Agregar Proveedor"} display={display} closeForm={closeForm} name="Agregar Proveedor">
                    <InputText label={"Nombre"} name="nombre" value={dataForm.nombre} onChange={handleInputChange}/>
                    <InputText label={"Correo"} name="correo" value={dataForm.correo} onChange={handleInputChange}/>
                    <InputText label={"Telefono"} name="telefono" value={dataForm.telefono} onChange={handleInputChange}/>
                    <InputText label={"Dirección"} name="direccion" value={dataForm.direccion} onChange={handleInputChange}/>
                    <InputText label={"Sitio Web"} name="sitioWeb" value={dataForm.sitioWeb} onChange={handleInputChange}/>
                    <ButtonPrimary label={"Guardar"} />
                </Form>  

            </div>

        </div>
    )
}

export default Proveedores;