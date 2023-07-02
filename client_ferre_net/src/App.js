import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Input from './components/Input/Input';
import Login from './pages/Login/Login';
import Order from './pages/Orders/Order';

function App() {

  const handleLogin = () =>{
    localStorage.setItem('user',true)
  }

  /*const handleLogout = () =>{
    setIsAuthenticated(false)
  }*/

  return (
    <Router>
      <Routes>

      <Route path='/login' element={<Login onLogin={handleLogin} />}></Route>

        {localStorage.getItem('user') === 'true' ? 
          <>
            <Route path='/' element={<Input/>}></Route>
            <Route path='/orders' element={<Order></Order>}></Route>
          </>
          :
          <Route path='*' element={<Navigate to="login"/>}></Route>
        }

        </Routes>
    </Router>
  );
}

export default App;
