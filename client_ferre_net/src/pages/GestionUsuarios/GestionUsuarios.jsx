import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MenuLeft from "../../components/Menu_Left/MenuLeft";
import Context from "../../context/Global";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import InputText from "../../components/Inputs/InputText";
import InputNumber from "../../components/Inputs/InputNumber/InputNumber";
import ApiUser from "../../services/ApiUsers";
import Table from "../../components/Table/Table";
import Form from "../../components/Form/Form";

import './GestionUsuarios.css'
import InputSelect from "../../components/Inputs/InputSelect/InputDate";
import Modal from "../../components/Modal/Modal";
let initDataForm = {nombre:'', telefono:'', correo:'', direccion:'', id:'', psw:'', rol:''}

const GestionUsuarios = () =>{

    const [display, setDisplay] = useState('')
    const [displayForm2, setDisplayForm2] = useState('')
    const [dataForm, setDataForm] = useState({nombre:'', telefono:'', correo:'', direccion:'', id:'', psw:'',  rol:'', idrol:''})
    const [newData, setNewData] = useState({})

    const [ordes, setOrders] = useState([])

    const [displayModal, setDisplayModal] = useState(false)
    const [idProv, setIdProv] = useState()

    const {menuHide} = useContext(Context);

    useEffect(()=>{
        new ApiUser().getUsers()
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

    const handleInputChange = (e) =>{
        console.log(e.target.name)
        let userID = generateUserID(dataForm.nombre, dataForm.correo, dataForm.telefono)
        setDataForm({
            ...dataForm,
            [e.target.name]:e.target.value,
            id: userID.toUpperCase()
        })
        
    }

    const openForm = (numForm) =>{
        if(numForm === 1){
            setDisplay('active')
            setDataForm(initDataForm)
        }else if(numForm === 2){
            setDisplayForm2('active')
        }        
    }

    const createUser = () =>{
        
        const settings = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(dataForm)
        }

        let objApiOrdenes = new ApiUser()
        objApiOrdenes.setSettings = settings

        objApiOrdenes.create()
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json=>{
            console.log(json)
            setNewData(json)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const updateUser = () =>{

        const settings = {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(dataForm)
        }

        let objApiUser = new ApiUser()
        objApiUser.setSettings = settings

        objApiUser.update()
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json=>{
            console.log(json)
            setNewData(json)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const closeForm = () => {
        setDisplay('')
        setDisplayForm2('')
    }

    const deleteUser = (e) =>{

        let objApiUser = new ApiUser()
        objApiUser.setId = idProv

        objApiUser.delete()
        .then(res => res ? res.json() : Promise.reject(res))
        .then(json=>{
            if(json.status === true){
                console.log("Usuario dado de baja Correctamente")
                setDisplayModal(false)
                setNewData(json)
            }else{
                console.log("Error al dar de baja el usuario")
            }
        })
        .catch(err=>{
            console.log(err)
            console.log("Error Intento más Tarde")
        })

    }

    const openFormUpdateOrder = (e) =>{
        openForm(2)

        let objApiUser = new ApiUser()
        objApiUser.setId = e.target.dataset.id

        objApiUser.getUserById()
        .then(res=>res.ok?res.json():Promise(res))
        .then(json=>{
            const dataOrder = json.data[0]
            console.log(dataOrder)
            setDataForm(dataOrder)

        })
        .catch(err=>{
            console.log("Error al Obtener los datos del la orden")
        })

    }

    const deleteAction = (e) =>{
        setIdProv(e.target.dataset.id)
        setDisplayModal(true)
    }

    function generateUserID(name, email, phone) {
        // Convertir nombre en minúsculas y eliminar espacios
        const cleanedName = name.toLowerCase().replace(/\s+/g, '');
      
        // Tomar las primeras letras del nombre y correo
        const initials = cleanedName.slice(0, 2) + email.slice(0, 2);
      
        // Tomar los últimos dígitos del número de teléfono
        const phoneDigits = phone.slice(-3);
      
        // Combinar las partes para crear el ID único
        const userID = `${initials}${phoneDigits}`;
      
        return userID;
    }

    return(
        <div className={`page${menuHide ? ' active' :''}`}>
            {displayModal &&
                <Modal text="¿Desea Dar de Baja este Usuario?" type="delete" event = {deleteUser} setDisplayModal = {setDisplayModal}/>
            }
            <MenuLeft/>

            <div className='container-page'>
                <Header title={"Gestión de Usuarios"}/>

                <div className='container'>
                    <div className='btn-content'>
                        <ButtonPrimary onClick={(e)=>openForm(1)} label={"Agregar Usuario"} style={{width:'12rem', fontSize:'0.9rem'}}/>
                    </div>

                    {
                        ordes &&

                        <div className='table-container'>
                            <Table 
                            headerData={['#', 'ID', 'Nombre', 'Dirección', 'Telefono', 'Correo', 'Rol', 'Acciones']}
                            attr={['idusuarios', 'id', 'nombre', 'direccion', 'telefono', 'correo', 'rol']}
                            rowData={ordes}
                            actions={"all"}
                            events = {{delete:deleteAction, openFormUpdate:openFormUpdateOrder}}
                            ></Table>
                        </div>  
                    }

                </div>


                <Form title={"Agregar Usuario"} display={display} closeForm={closeForm} name="Crear-usuarios">
                    <InputSelect label={"Rol"} name="rol" value={dataForm.rol} onChange={handleInputChange} options={[{id:1, text:'Administrador'}, {id:2, text:'Empleado'}]}/>
                    <InputText label={"ID"} name="id" value={dataForm.id} onChange={handleInputChange} disabled/>
                    <InputText label={"Nombre"} name="nombre" value={dataForm.nombre} onChange={handleInputChange}/>
                    <InputText label={"Dirección"} name="direccion" value={dataForm.direccion} onChange={handleInputChange}/>
                    <InputText label={"Telefono"} name="telefono" value={dataForm.telefono} onChange={handleInputChange}/>
                    <InputText label={"Correo"} name="correo" value={dataForm.correo} onChange={handleInputChange}/>

                    <ButtonPrimary label={"Guardar"} onClick={createUser}/>
                </Form>    

                <Form title={"Actualizar Usuario"} display={displayForm2} closeForm={closeForm} name="Actualizar-usuario">
                    <InputSelect label={"Rol"} name="idrol" value={dataForm.idrol} onChange={handleInputChange} options={[{id:1, text:'Administrador'}, {id:2, text:'Empleado'}]}/>
                    <InputText label={"ID"} name="id" value={dataForm.id} onChange={handleInputChange} disabled/>
                    <InputText label={"Nombre"} name="nombre" value={dataForm.nombre} onChange={handleInputChange}/>
                    <InputText label={"Dirección"} name="direccion" value={dataForm.direccion} onChange={handleInputChange}/>
                    <InputText label={"Telefono"} name="telefono" value={dataForm.telefono} onChange={handleInputChange}/>
                    <InputText label={"Correo"} name="correo" value={dataForm.correo} onChange={handleInputChange}/>

                    <ButtonPrimary label={"Guardar"} onClick={updateUser}/>
                </Form>

            </div>
        </div>
    )
}

export default GestionUsuarios;