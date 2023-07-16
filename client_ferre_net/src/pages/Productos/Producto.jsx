import React, { useEffect, useState } from 'react';
import MenuLeft from '../../components/Menu_Left/MenuLeft';
import './Producto.css';
import Header from '../../components/Header/Header';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import Form from '../../components/Form/Form';
import Table from '../../components/Table/Table';
import ApiProductos from '../../services/ApiProductos';
import InputText from '../../components/Inputs/InputText';


const Producto = () => {
  const [display, setDisplay] = useState('');
  const [dataForm, setDataForm] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    marca: '',
    precio_unitario: '',
    precio_menudeo: '',
    precio_mayoreo: '',
    id_categoria: '',
    id_proveedor: '',
  });
  const [newData, setNewData] = useState({});
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    new ApiProductos()
      .getProducts()
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        const data = json.data;
        setProductos(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [newData]);

  const openForm = () => {
    setDisplay('active');
  };

  const closeForm = () => {
    setDisplay('');
  };

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

  const deleteProducto = (e) => {
    const idproducto = e.target.dataset.id;

    let apiProductos = new ApiProductos();
    apiProductos.setIdProducto(idproducto);

    apiProductos
      .eleteProducto()
      .then((res) => (res ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        if (json.status === true) {
          console.log('Producto eliminado correctamente');
          setNewData(json);
        } else {
          console.log('Error al eliminar el producto');
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('Error. Intenta más tarde');
      });
  };

  return (
    <div className='page'>
      <MenuLeft />
      <div className='container-page'>
        <Header title={'Productos'} />
        <div className='container'>
          <div className='btn-content'>
            <ButtonPrimary
              onClick={openForm}
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
                rowData={productos}
                actions={'all'}
                events={{ deleteProducto }}
              ></Table>
            </div>
          )}
        </div>
        <Form title={'Crear Producto'} display={display} closeForm={closeForm}>
          <InputText
            label={'Código'}
            name='codigo'
            value={dataForm.codigo}
            onChange={handleInputChange}
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
          <InputText
            label={'Precio Unitario'}
            name='precio_unitario'
            value={dataForm.precio_unitario}
            onChange={handleInputChange}
          />
          <InputText
            label={'Precio Menudeo'}
            name='precio_menudeo'
            value={dataForm.precio_menudeo}
            onChange={handleInputChange}
          />
          <InputText
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
          <InputText
            label={'Proveedor'}
            name='id_proveedor'
            value={dataForm.id_proveedor}
            onChange={handleInputChange}
          />
          <ButtonPrimary label={'Crear'} onClick={createProducto} />
        </Form>
      </div>
    </div>
  );
};

export default Producto;
