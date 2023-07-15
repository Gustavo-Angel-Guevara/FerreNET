import React from 'react'
import MenuLeft from '../../components/Menu_Left/MenuLeft';

import './Dashboard.css'
import Header from '../../components/Header/Header';


const Dashboard = () =>{
    return(
        <div className='page'>
            
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