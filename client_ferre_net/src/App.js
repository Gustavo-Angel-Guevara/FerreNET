import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Input from './components/Input/Input';
import { useState } from 'react';
import Login from './pages/Login/Login';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () =>{
    setIsAuthenticated(true)
  }

  /*const handleLogout = () =>{
    setIsAuthenticated(false)
  }*/

  return (
    <Router>
      <Routes>

      <Route path='/login' element={<Login onLogin={handleLogin} />}></Route>

        {isAuthenticated ? 
          <Route path='/' element={<Input/>}></Route>
          :
          <Route path='*' element={<Navigate to="login"/>}></Route>
        }

        </Routes>
    </Router>
  );
}

export default App;
