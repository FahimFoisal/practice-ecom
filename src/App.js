import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Menu from './components/nav/Menu';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='' element={<Dashboard/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
