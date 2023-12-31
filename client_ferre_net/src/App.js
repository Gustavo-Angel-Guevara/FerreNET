import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login/Login';
import Order from './pages/Orders/Order';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/Productos/Producto';
import History from './pages/History/History';
import Inventario from './pages/Inventario/inventario';
import Proveedores from './pages/Proveedores/Proveedores';
import SalesControl from './pages/Sales/SalesControl';
import OrderReceived from './pages/Orders/OrderReceived';
import GestionUsuarios from './pages/GestionUsuarios/GestionUsuarios';

function App() {
  
  const PrivateRoutes = () => {
    let auth = { token: localStorage.getItem('user') };
    return auth.token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  }

  return (
      <Router>
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/orders" element={<Order />} />
            <Route exact path="/OrderReceived" element={<OrderReceived />} />
            <Route exact path="/proveedores" element={<Proveedores />} />
            <Route exact path="/products" element={<ProductList />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/inventario" element={<Inventario />} />
            <Route exact path="/SalesControl" element={<SalesControl/>}></Route>
            <Route exact path='/users' element={<GestionUsuarios/>}></Route>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;

