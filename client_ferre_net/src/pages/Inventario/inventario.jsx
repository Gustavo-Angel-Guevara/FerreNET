import React, { useContext, useEffect, useState } from "react";
import './inventario.css'
import MenuLeft from "../../components/Menu_Left/MenuLeft";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import Context from "../../context/Global";
import ApiProductos from "../../services/ApiProductos";

const Inventario = () => {
    const {menuHide} = useContext(Context);
    const [inventario, setInventario] = useState([])
    const [newData, setNewData] = useState({})


    useEffect(()=>{
      let objApiInventory = new ApiProductos()

      objApiInventory.getInventory()
      .then(res => res.ok ? res.json() : Promise(res))
      .then(json =>{
          console.log(json)
          setInventario(json.data)
      })
      .catch(err=>{
          console.error(err)
      })
    }, [newData])

  
    return (

      <div className={`page ${menuHide && 'active'}`}>

      <MenuLeft/>

      <div className='container-page'>
          <Header title={"Inventario"}/>

          <div className='container'>
              <div className='table-container'>
                      <Table 
                      headerData={['#', 'Producto', 'Código', 'Cantidad', 'Fecha Entrada', 'Fecha de Ultima Actualización', 'Sucursal']}
                      attr={['idinventario', 'nombre', 'codigo', 'cantidad', 'fecha_entrada', 'fecha_actualizada', 'sucursal']}
                      rowData={inventario}
                      actions={""}
                      events = {null}
                      ></Table>
              </div>  
          </div>

        </div>
      </div>

    );
  };
  
  export default Inventario;
  