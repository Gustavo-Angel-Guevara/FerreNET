import React, { useContext, useEffect, useState } from 'react';
import MenuLeft from '../../components/Menu_Left/MenuLeft';
import './Producto.css';
import Header from '../../components/Header/Header';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import Form from '../../components/Form/Form';
import Table from '../../components/Table/Table';
import ApiProductos from '../../services/ApiProductos';
import InputText from '../../components/Inputs/InputText';
import Context from '../../context/Global';
import InputSelect from '../../components/Inputs/InputSelect/InputDate';
import InputPrice from '../../components/Inputs/InputPrice/InputPrice';
import Modal from "../../components/Modal/Modal";
import InputNumber from '../../components/Inputs/InputNumber/InputNumber';


let initDataForm = {codigo: '',
nombre: '',
descripcion: '',
marca: '',
precio_unitario: '',
precio_menudeo: '',
cantidad: 0,
precio_mayoreo: '',
id_categoria: '',
id_proveedor: ''}

const Producto = () => {
  const [display, setDisplay] = useState('');
  const [dataForm, setDataForm] = useState(initDataForm);
  const [newData, setNewData] = useState({});
  const [productos, setProductos] = useState(null);
  const [displayForm2, setDisplayForm2] = useState('')
  const [displayModal, setDisplayModal] = useState(false)
  const [displayModal2, setDisplayModal2] = useState(false)

  const [idProv, setIdProv] = useState()
  const [productsMatch, setProductsMatch] = useState([]);

  const {menuHide} = useContext(Context);


  useEffect(() => {
    new ApiProductos()
      .getProducts()
      .then((json) => {
        const data = json.data;
        setProductos(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [newData]);

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

  const handleInputChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const createProducto = () => {
    const producto = { ...dataForm };

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    };

    let apiProductos = new ApiProductos();
    apiProductos.setSettings = settings;

    apiProductos
      .createProduct()
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        setNewData(json); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProducto = (id) => {
    let apiProductos = new ApiProductos();
    apiProductos.setId = id;

    apiProductos
      .deleteProducto()
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
          setDisplayModal(false)
          setNewData(json);
      })
      .catch((err) => {
        console.log('Error. Intenta más tarde');
      });
  };

  const openFormUpdateOrder = (e, index) =>{
    openForm(2)

    let objApiOrdenes = new ApiProductos()

    if(e){
      objApiOrdenes.setId = e.target.dataset.id
    }else{
      objApiOrdenes.setId = index;
    }

    objApiOrdenes.getProductsById()
    .then(res=>res.ok?res.json():Promise(res))
    .then(json=>{
        const dataOrder = json.data
        dataOrder.precio_unitario =`$${dataOrder.precio_unitario}`
        setDataForm(dataOrder)
    })
    .catch(err=>{
        console.log("Error al Obtener los datos del producto")
    })
  }

  const updateOrder = () =>{
    console.log(dataForm)
    let dataFormat = {...dataForm, precio_unitario : dataForm.precio_unitario.replace('$', '')}


    const settings = {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(dataFormat)
    }

    let objApiOrdenes = new ApiProductos()
    objApiOrdenes.setSettings = settings

    objApiOrdenes.updateProduct()
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json=>{
        setNewData(json)
        updateInventory()
    })
    .catch(err=>{
        console.log(err)
    })
  }

  const updateInventory = ()=>{
    const settings = {
      method : 'PUT',
      headers : {
          'Content-Type' : 'application/json'
      },
      body : JSON.stringify(dataForm)
    }

    let objApiOrdenes = new ApiProductos()
    objApiOrdenes.setSettings = settings

    objApiOrdenes.updateInventory()
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json=>{
        setNewData(json)
    })
    .catch(err=>{
        console.log(err)
    })
  }

  const deleteAction = (e) =>{
    if(localStorage.getItem('deleteModal') === 'true'){
        setIdProv(e.target.dataset.id)
        deleteProducto(e.target.dataset.id)
    }else{
        setIdProv(e.target.dataset.id)
        setDisplayModal(true)
    }
  }

  const searchProduct = (e)=>{
    let objApiOrdenes = new ApiProductos()
    objApiOrdenes.setId = e.target.value

    objApiOrdenes.searchProductByTerm()
    .then(res=>res.ok?res.json():Promise(res))
    .then(json=>{
        const data = json.data
        setProductsMatch(data)
    })
    .catch(err=>{
        console.log("Error al Obtener los datos del producto")
    })    

  }

  const selectProductMatch = (index) =>{
    setDisplayModal2(false)
    openFormUpdateOrder(null, productsMatch[index]['idproducto']) 
    setDisplay('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      let objApiOrdenes = new ApiProductos()
      objApiOrdenes.setId = e.target.value
  
      objApiOrdenes.searchProductByTerm()
      .then(res=>res.ok?res.json():Promise(res))
      .then(json=>{
          const data = json.data
          setProductos(data)
      })
      .catch(err=>{
          console.log("Error al Obtener los datos del producto")
      })   

    }
  };
  
  return (
    <div className={`page ${menuHide && 'active'}`}>

      {displayModal &&
          <Modal text={"¿Seguro de Eliminar este Producto?"} type={"delete-noAskAgain"} event = {deleteProducto} setDisplayModal = {setDisplayModal}/>
      }


      {displayModal2 &&
          <Modal text={"Seleccione el Producto que desea Agregar"} type={"products-match"} event = {deleteProducto} 
          setDisplayModal = {setDisplayModal2} data={productsMatch} event2={selectProductMatch}/>
      }

      <MenuLeft />
      <div className='container-page'>

        <Header title={'Productos'}>
          <div onKeyDown={handleKeyDown} className='input-container'>
            <input type="text" placeholder='Buscar Producto (Nombre ó Código)'/>
          </div>
        </Header>

        <div className='container'>
          <div className='btn-content'>
            <ButtonPrimary
              onClick={(e)=>openForm(1)}
              label={'Crear Producto'}
              style={{ width: '12rem', fontSize: '0.9rem' }}
            />
          </div>
          {productos && (
            <div className='table-container'>
              <Table
                headerData={[
                  'ID',
                  'Código',
                  'Nombre',
                  'Descripción',
                  'Marca',
                  'Precio Unitario',
                  'Precio Menudeo',
                  'Precio Mayoreo',
                  'Categoría',
                  'Proveedor',
                  'Acciones',
                ]}
                attr={['idproducto', 'codigo', 'nombre', 'descripcion', 'marca', 'precio_unitario', 'precio_menudeo', 'precio_mayoreo', 'nombre_categoria', 'proveedor']}
                rowData={productos}
                actions={'all'}
                events = {{delete:deleteAction, openFormUpdate:openFormUpdateOrder}}
              ></Table>
            </div>
          )}
        </div>

        <Form title={'Crear Producto'} display={display} closeForm={closeForm}>

          <p className='extra-info'>Verificaremos si no existe el producto:</p>
          <InputText
              label={'Ingresa Código o Nombre del Producto'}
              name='codigoNombre'
              value={dataForm.codigoNombre}
              onChange={searchProduct}
              style_container={{marginBottom:'0px', marginTop:'0rem'}}
            />

            {
              productsMatch.length > 0 ?
                productsMatch.length == 1 ?
                  <p className='extra-info match' onClick={(e)=> { setDisplay('');  openFormUpdateOrder(null, productsMatch[0]['idproducto'])  } }>Coincidencias ({productsMatch.length}) - Seleccionar</p>
                :
                  <p onClick={(e)=>setDisplayModal2(true)} className='extra-info match'>Ver Coincidencias ({productsMatch.length})</p>
              : 
                null
            }


          <hr />

          <InputText
            label={'Nombre'}
            name='nombre'
            value={dataForm.nombre}
            onChange={handleInputChange}
          />
          <InputText
            label={'Descripción'}
            name='descripcion'
            value={dataForm.descripcion}
            onChange={handleInputChange}
          />
          <InputText
            label={'Marca'}
            name='marca'
            value={dataForm.marca}
            onChange={handleInputChange}
          />
          <InputPrice
            label={'Precio Unitario'}
            name='precio_unitario'
            value={dataForm.precio_unitario}
            onChange={handleInputChange}
          />
          <InputPrice
            label={'Precio Menudeo'}
            name='precio_menudeo'
            value={dataForm.precio_menudeo}
            onChange={handleInputChange}
          />
          <InputPrice
            label={'Precio Mayoreo'}
            name='precio_mayoreo'
            value={dataForm.precio_mayoreo}
            onChange={handleInputChange}
          />
          <InputText
            label={'Categoría'}
            name='id_categoria'
            value={dataForm.id_categoria}
            onChange={handleInputChange}
          />
          <InputNumber
            label={'Cantidad'}
            name='cantidad'
            value={dataForm.cantidad}
            onChange={handleInputChange}
          />

          <InputSelect label={"Proveedor"} name="id_proveedor" value={dataForm.id_proveedor} onChange={handleInputChange}/>


          <ButtonPrimary label={'Crear'} onClick={createProducto} />
        </Form>

        <Form title={"Actualizar Producto"} display={displayForm2} closeForm={closeForm} name="Actualizar Productos">
          <InputText
            label={'Código'}
            name='codigo'
            value={dataForm.codigo}
            onChange={handleInputChange}
            disabled
          />
          <InputText
            label={'Nombre'}
            name='nombre'
            value={dataForm.nombre}
            onChange={handleInputChange}
          />
          <InputText
            label={'Descripción'}
            name='descripcion'
            value={dataForm.descripcion}
            onChange={handleInputChange}
          />
          <InputText
            label={'Marca'}
            name='marca'
            value={dataForm.marca}
            onChange={handleInputChange}
          />
          <InputPrice
            label={'Precio Unitario'}
            name='precio_unitario'
            value={dataForm.precio_unitario}
            onChange={handleInputChange}
          />
          <InputPrice
            label={'Precio Menudeo'}
            name='precio_menudeo'
            value={dataForm.precio_menudeo}
            onChange={handleInputChange}
          />
          <InputPrice
            label={'Precio Mayoreo'}
            name='precio_mayoreo'
            value={dataForm.precio_mayoreo}
            onChange={handleInputChange}
            />

          <InputNumber
            label={'Cantidad'}
            name='cantidad'
            value={dataForm.cantidad}
            onChange={handleInputChange}
          />

          <InputText
            label={'Categoría'}
            name='id_categoria'
            value={dataForm.id_categoria}
            onChange={handleInputChange}
          />



          <InputSelect label={"Proveedor"} name="id_proveedor" value={dataForm.id_proveedor} onChange={handleInputChange}/>
          <ButtonPrimary label={"Guardar"} onClick={updateOrder}/>
        </Form> 

      </div>
    </div>
  );
};

export default Producto;
