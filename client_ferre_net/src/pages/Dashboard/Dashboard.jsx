import React, { useContext, useEffect } from 'react'
import MenuLeft from '../../components/Menu_Left/MenuLeft';

import './Dashboard.css'
import Header from '../../components/Header/Header';
import Context from '../../context/Global';
import { useNavigate } from 'react-router-dom';

const Dashboard = () =>{

    const {menuHide} = useContext(Context)
    const navigate = useNavigate();

    useEffect(()=>{
        let setting = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({token:localStorage.getItem('session')})
        }

        fetch('http://localhost:1000/validate-token', setting)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json=>{
            
        })
        .catch(err=>{
            navigate("/login")
        })
    })

    return(
        <div className={`page${menuHide ? ' active' :''}`}>
            
            <MenuLeft/>

            <div className='container-page'>
                <Header title={"Dashboard"}/>

                <div className='container'>
         
                </div>    

            </div>


        </div>
    )
}

export default Dashboard;