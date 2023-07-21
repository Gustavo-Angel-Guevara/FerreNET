import React, { useState } from 'react'

import './Login.css'

import background from '../../assets/images/background_login.jpg'
import rol_admin from '../../assets/images/rol_administrator.png'
import rol_employee from '../../assets/images/rol_employee.png'
import icon_ok from '../../assets/icon/icon_ok.png'
import logo from '../../assets/images/Logo_Dark.png'
import Input from '../../components/Inputs/Input'
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary'
import { json, useNavigate } from 'react-router-dom'
import ApiUser from '../../services/ApiUsers'

const Login = () =>{

    const [dataForm, setDataForm] = useState({id:'', psw:'', rol:''});
    const [activeArticle, setActiveArticle] = useState(null);
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleClickSetActive = (e, rol) =>{
        setActiveArticle(rol)
    }

    const handleInputChange = (e) =>{
        setDataForm({
            ...dataForm,
            [e.target.name]:e.target.value
        })
    }

    const handleClick = e =>{

        if(dataForm.id === "" || dataForm.psw === "" || dataForm.rol === "") return

        const settings = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(dataForm)
        }

        let objApiUser =new ApiUser()
        objApiUser.setSettings = settings

        objApiUser.auth()
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(json => Promise.reject(json));
            }
        })
        .then(json =>{
            setError(null)
            localStorage.setItem('user','true')
            navigate("/");
        })
        .catch(err=>{
            console.error(err)
            setError(err.msg)
        })

        
    }

    return(
        <div className='login-container'>
            <div className='login-left'>
                <div>
                    <img src={logo} alt="" />

                    <div className='login-container-wrf'>                  
                        <div className='welcome'>
                            <h1 className='title-1'>Bienvenido!!</h1>
                            <p className='text-third'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.</p>
                        </div>

                        <div className='login-rols-container'>
                            <p className='text-primary'>Por favor selecciona tu rol</p>
                            <div className='login-rols'>
                                <article onClick={(e)=>{handleClickSetActive(e, 'admin'); dataForm.rol = 1}} className={`login-rol-admin ${activeArticle === 'admin' ? 'active' : ''}`}>
                                    <p className='text-second'>Administrador</p>
                                    <img src={rol_admin} alt="Administrador" />
                                    <img id='ok_admin' className={activeArticle === 'admin' ? 'active' : ''} src={icon_ok} alt="Ok" />
                                </article>
                                <article onClick={(e)=>{handleClickSetActive(e, 'employee'); dataForm.rol = 2}} className={`login-rol-employee ${activeArticle === 'employee' ? 'active' : ''}`}>
                                    <p className='text-second'>Empleado</p>
                                    <img src={rol_employee} alt="Empleado" />
                                    <img id='ok_employee' className={activeArticle === 'employee' ? 'active' : ''} src={icon_ok} alt="Ok" />
                                </article>
                            </div>
                        </div>

                        <div className='login-form'>
                            <Input label={"ID"} type="text" placeholder="Ingresa tu ID" name="id" value={dataForm.id} onChange={handleInputChange}></Input>
                            <Input label={"Contraseña"} type="password" placeholder="Ingresa tu Contraseña" name="psw" value={dataForm.psw} onChange={handleInputChange}></Input>
                            <ButtonPrimary label={"Ingresar"} type="button" onClick={handleClick}/>

                            {error &&
                                <p className='error'>{error}</p>
                            }
                            <p className='text-third forget-password'>Olvide Contraseña</p>
                        </div>
                    </div>  
                </div>
            </div>
            <div className='login-right'>
                <img src={background} alt="" />
            </div>
        </div>
    )
}

export default Login;