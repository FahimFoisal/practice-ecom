import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Menu from './components/nav/Menu';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard';
import Dashboard1 from './pages/admin/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';
import NotFound from './pages/NotFound/NotFound';
import AdminRoute from './components/routes/AdminRoute';
import Category from './pages/admin/Category';
import Product from './pages/admin/Product';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import ProductUpdate from './pages/admin/ProductUpdate';
import Shop from './pages/Shop';


function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>}></Route>
          <Route path='user/profile' element={<Profile/>}></Route>
          <Route path='user/orders' element={<Order/>}></Route>
          <Route path='secret' element={<NotFound/>}></Route>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<Dashboard1/>}></Route>
          <Route path='admin/category' element={<Category/>}></Route>
          <Route path='admin/product' element={<Product/>}></Route>
          <Route path='admin/product/update/:slug' element={<ProductUpdate/>}></Route>
          <Route path='admin/products' element={<Products/>}></Route>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
