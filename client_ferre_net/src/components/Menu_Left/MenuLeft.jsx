
import logo from '../../assets/images/Logo_Dark.png'
import dashboard from '../../assets/icon/dashboard_icon.png'
import inventario from '../../assets/icon/inventario_icon.png'
import products from '../../assets/icon/products_icon.png'
import proveedores from '../../assets/icon/proveedores_icon.png'
import user from '../../assets/icon/user_icon.png'
import left_arrow from '../../assets/icon/left_arrow.png'
import out from '../../assets/icon/out_icon.png'

import './MenuLeft.css';
import { Link } from 'react-router-dom'


const MenuLeft = ()=>{
    return(
        <div className='menu-left'>

            <div className='logo'>
                <img src={logo} alt="Ferrenet" />
            </div>

            <img className='arrow' src={left_arrow} alt="" />

            <nav>
                <ul>
                    <div>

                        <li className='option-1'>
                            <div>
                                <img src={dashboard} alt="" />
                                <p>Tablero</p>
                            </div>
                        </li>

                        <li className='option-2'>
                            <div>
                                <img src={products} alt="" />
                                <p>Productos</p>
                            </div>
                        </li>

                        <li className='option-3'>
                            <div >
                                <img src={proveedores} alt="" />
                                <p>Proveedores</p>
                            </div>
                        </li>

                        <li>
                            <div className='option-0'>
                                <img src={inventario} alt="" />
                                <p>Inventario</p>
                            </div>

                            <ul className='almacen-menu'>
                                <li className='option-4'>
                                    <div>
                                        <img src="" alt="" />
                                        <p>Almacén</p>
                                    </div>
                                </li>

                                <Link to="/orders">
                                    <li className='option-5'>
                                        <div>
                                            <img src="" alt="" />
                                            <p>Orden Compra</p>
                                        </div>
                                    </li>
                                </Link>

                                <li className='option-6'>
                                    <div>
                                        <img src="" alt="" />
                                        <p>Ordenes Recibidas</p>
                                    </div>
                                </li>
                            </ul>
                        </li>

                        <li className='option-7'>
                            <div>
                                <img src={user} alt="" />
                                <p>Gestión de Usuarios</p>
                            </div>
                        </li>

                        <Link to="/history"> 
                            <li className='option-8'>
                                <div>
                                    <img src={user} alt="" />
                                    <p>Historial de Movimientos</p>
                                </div>
                            </li>
                        </Link>
                        
                    </div>

                    <li className='option-9'>
                        <div>
                            <img src={out} alt="" />
                            <p>Salir</p>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default MenuLeft;