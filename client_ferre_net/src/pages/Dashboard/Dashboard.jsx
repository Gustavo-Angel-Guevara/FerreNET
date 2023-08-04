import React, { useContext } from 'react'
import MenuLeft from '../../components/Menu_Left/MenuLeft';

import './Dashboard.css'
import Header from '../../components/Header/Header';
import Context from '../../context/Interface';



const Dashboard = () =>{

    const {menuHide} = useContext(Context)


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