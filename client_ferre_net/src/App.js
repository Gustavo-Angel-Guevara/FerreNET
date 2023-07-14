import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login/Login';
import Order from './pages/Orders/Order';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {


  const PrivateRoutes = () => {
    let auth = {'token':localStorage.getItem('user')}
  return (
      auth.token ? <Outlet/> : <Navigate to='/login'/>
    )
  }

  return (
    <Router>
      <Routes>

        <Route exact path='/login' element={<Login />}></Route>

        <Route element={<PrivateRoutes/>}>
          <Route exact path='/' element={<Dashboard/>}></Route>
          <Route exact path='/orders' element={<Order></Order>}></Route>
        </Route>
          

        </Routes>
    </Router>
  );
}

export default App;
