
import logo from '../../assets/images/Logo_Dark.png'
import dashboard from '../../assets/icon/dashboard_icon.png'
import inventario from '../../assets/icon/inventario_icon.png'
import products from '../../assets/icon/products_icon.png'
import proveedores from '../../assets/icon/proveedores_icon.png'
import user from '../../assets/icon/user_icon.png'
import left_arrow from '../../assets/icon/left_arrow.png'
import icon_ok from '../../assets/icon/icon_ok.png'

import './MenuLeft.css';
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import Context from '../../context/Global'
import Modal from '../Modal/Modal'

let flag = false;
const MenuLeft = ()=>{

    
    const [active, setActive] = useState('')
    const [displayModal, setDisplayModal] = useState(false)

    const {
        setMenuHide,
        menuHide
    } = useContext(Context)

    useEffect(()=>{
        window.addEventListener('resize', resposive)

        return () => {
        window.removeEventListener('resize', resposive)
        }
    })

    const resposive = (e) =>{
        if(e.target.innerWidth <= 900){
            setMenuHide(true)
        }else{
            setMenuHide(false)
        }

        if(e.target.innerWidth <= 800 && localStorage.getItem('warnModalResposive') === 'false'){
            setDisplayModal(true)
        }else{
            setDisplayModal(false)
        }
    }

    const onMouseLeave =(e)=>{

        setActive(''); 

        if(flag){
            setMenuHide(true)
        }
        flag = false;
    }

    const onMouseEnter =(e)=>{
        setActive('active')


        if(menuHide){
            setMenuHide(false)
            flag = true;
        }
    }

    return(
        <div className='menu-left'>

            {displayModal && 
                <Modal text={"¡Disminuir el tamaño del sistema podría dificultar su uso!"} type={"info-noAskAgain"} setDisplayModal={setDisplayModal}/>
            }

            <div className='logo'>
                <img id='logo-big' src={logo} alt="Ferrenet" />
                <img id='logo-small' src={icon_ok} alt='Ferrenet'/>
            </div>

            <img className='arrow' src={left_arrow} alt="" onClick={(e)=>setMenuHide(!menuHide)} />

            <nav>
                <ul>
                    <div>
                        <Link to="/">
                            <li className='option-1'>
                                <div>
                                    <img src={dashboard} alt="" />
                                    <p>Tablero</p>
                                </div>
                            </li>
                        </Link>
                        
                        <Link to="/SalesControl">
                            <li className='option-2'>
                                <div >
                                    <img src={""} alt="Caja" />
                                    <p>Caja Ventas</p>
                                </div>
                            </li>
                        </Link>

                        <Link to="/products">
                            <li className='option-3'>
                                <div>
                                    <img src={products} alt="" />
                                    <p>Productos</p>
                                </div>
                            </li>
                        </Link>

                        <Link to="/proveedores">
                            <li className='option-4'>
                                <div >
                                    <img src={proveedores} alt="" />
                                    <p>Proveedores</p>
                                </div>
                            </li>
                        </Link>

                        <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            <div className='option-0'>
                                <img src={inventario} alt="" />
                                <p>Inventario</p>
                            </div>

                            <ul className={`almacen-menu ${active}`}>

                                <Link  to={"/inventario"}>
                                    <li className='option-5'>
                                        <div>
                                            <img src="" alt="" />
                                            <p>Almacén</p>
                                        </div>
                                    </li>
                                </Link>

                                <Link to="/orders">
                                    <li className='option-6'>
                                        <div>
                                            <img src="" alt="" />
                                            <p>Orden Compra</p>
                                        </div>
                                    </li>
                                </Link>

                                <Link to="/OrderReceived">
                                    <li className='option-7'>
                                        <div>
                                            <img src="" alt="" />
                                            <p>Ordenes Recibidas</p>
                                        </div>
                                    </li>
                                </Link>
                            </ul>
                        </li>
                        
                        <Link to={"/users"}>
                            <li className='option-8'>
                                <div>
                                    <img src={user} alt="" />
                                    <p>Gestión de Usuarios</p>
                                </div>
                            </li>
                        </Link>

                        <Link to="/history"> 
                            <li className='option-9'>
                                <div>
                                    <img src={user} alt="" />
                                    <p>Historial de Movimientos</p>
                                </div>
                            </li>
                        </Link>
                        
                    </div>

                </ul>
            </nav>
        </div>
    )
}

export default MenuLeft;