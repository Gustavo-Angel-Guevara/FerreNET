import { useContext, useEffect, useState } from "react";
import ButtonPrimary from "../../components/ButtonPrimary/ButtonPrimary";
import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header"
import InputText from "../../components/Inputs/InputText";
import MenuLeft from "../../components/Menu_Left/MenuLeft"

import './SalesControl.css'
import InputNumber from "../../components/Inputs/InputNumber/InputNumber";
import InputPrice from "../../components/Inputs/InputPrice/InputPrice";
import InputDate from "../../components/Inputs/InputDate/InputDate";
import Table from "../../components/Table/Table";
import { SalesControlClass } from "../../utils/salesControl";
import DateUtils from "../../utils/DateUtils";
import Modal from "../../components/Modal/Modal";

import Context from '../../context/Global';


const SalesControl = () =>{

    const [dataForm, setDataForm] = useState({product:'', cantidad:1, cantidadTotal:0, monto:'', recibe:'', change:'', date: new DateUtils().getCurrentDate() })
    const [display, setDisplay] = useState("")
    const [products, setProducts] = useState([]);

    const [error, setError] = useState(null)

    const [displayModal, setDisplayModal] = useState(false)
    const [idProv, setIdProv] = useState()

    const {menuHide, setMenuHide} = useContext(Context);

    useEffect(()=>{
        window.addEventListener('resize', resposive)

        return () => {
        window.removeEventListener('resize', resposive)
        }
    })

    const resposive = (e) =>{
        console.log(e)
        if(e.target.innerWidth <= 1117){
            setMenuHide(true)
        }else{
            setMenuHide(false)
        }
    }

    const displayForm = (e) =>{

        if(dataForm.product === ""){
            setError("Ingrese el Codigo del Producto")
        }else{
            setDisplay('active')
            searchProduct(e);
        }
    }

    const searchProduct = (e) =>{        
        let objSalesControl = new SalesControlClass()
        if(!objSalesControl.searchProduct(dataForm.product, products, setProducts, dataForm.cantidad)){
            setError(objSalesControl.getError)
        }else{

            setError(null)
            setDataForm({...dataForm, cantidadTotal:objSalesControl.getQuantiyProducts, monto:`$${objSalesControl.getMonto}`})
        }
    }

    const closeForm = () => {
        setDisplay('')
    }

    const handleInputChange = (e) =>{
        setDataForm({
            ...dataForm,
            [e.target.name]:e.target.value
        })
    }

    const submitSale = (e) =>{
        let change = (dataForm.recibe).replace('$', '') - (dataForm.monto).replace('$', '')

        setDataForm({...dataForm, change:'$'+change})
    }

    const deleteAction = (e) =>{

        if(localStorage.getItem('deleteModal') === 'true'){
            setIdProv(e.target.dataset.id)
            removeItem()
        }else{
            setIdProv(e.target.dataset.id)
            setDisplayModal(true)
        }

    }

    const removeItem = (e) =>{
        let objSalesControl = new SalesControlClass()
        objSalesControl.removeProduct(idProv, products, setProducts)
        setDataForm({...dataForm, cantidadTotal:objSalesControl.getQuantiyProducts, monto:`$${objSalesControl.getMonto}`})
        setDisplayModal(false)
    }

    return(
        <div className={`page ${menuHide && 'active'}`}>

            <MenuLeft/>

            {displayModal &&
                    <Modal text={"¿Seguro de Eliminar este Producto?"} type={"delete-noAskAgain"} event = {removeItem} setDisplayModal = {setDisplayModal}/>

            }

            <div className='container-page'>
                <Header title={"Caja"}/>

                <div className={`salesControl ${display}`}>
                    <section className="left">
                        <div className="search-product">
                            <InputText label={"Código Producto"} name="product" value={dataForm.product} onChange={handleInputChange} style_container={{margin:'1.5rem 0 0.3rem 0'}}></InputText>
                            <InputNumber label={"Cantidad"} name="cantidad" value={dataForm.cantidad} onChange={handleInputChange}  min='1' style_container={{margin:'1.5rem 0 0.3rem 0'}}/>
                            <ButtonPrimary onClick={displayForm} label={"Agregar"} style={{margin:'1.5rem 0 0.3rem 0'}}></ButtonPrimary>
                        </div>
                        {error &&
                            <p className="warn">{error}</p>
                        }

                        {products &&
                            <div className='table-container'>
                                <Table 
                                    headerData={['#', 'Código', 'Nombre', 'Marca', 'Precio Unitario', 'Total', 'Cantidad', 'Acciones']}
                                    attr={['#', 'codigo', 'nombre', 'marca', 'precio_unitario', 'total', 'Cantidadtems']}
                                    rowData={products}
                                    actions={'cancel'}
                                    events = {{cancel:deleteAction}}
                                ></Table>
                            </div> 
                        }
                        


                    </section>

                    <section className={`right ${display}`}>
                        <div className="sale-details">
                        <Form title={"Detalles de Compra"} display={"active"} closeForm={closeForm} name="Detalles de Compra" style={{width:"inherit", position:"relative", top:0, borderBottom:"1px solid var(--color-border-shadow)"}}>
                            <InputDate label={"Fecha"} name="fecha_requerida" value={dataForm.date} disabled/>
                            <InputNumber label={"Cantidad Items"} name="cantidadTotal" value={dataForm.cantidadTotal} disabled/>
                            <InputPrice label={"Total Pagar"} value={dataForm.monto} name="monto" disabled/>

                            <hr />

                            <InputPrice label={"Recibido ($)"} name="recibe" value={dataForm.recibe} onChange={handleInputChange} />
                            <InputPrice label={"Cambio ($)"} name="change" value={dataForm.change} disabled />

                            <ButtonPrimary label={"Procesar Pago"} onClick={submitSale}/>
                        </Form>
                        </div>
                    </section>

                </div>

            </div>
        </div>
    )
}

export default SalesControl;