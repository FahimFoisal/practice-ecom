import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Menu = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const logout = () => {
        setAuth({...auth, user: null, token: ''});
        localStorage.removeItem("auth");
        navigate("/");
    }
    return (
        <>
            <ul className='nav d-flex justify-content-around shadow-sm mb-4'>
                <li className='nav-item'>
                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                </li>
                {
                    (!auth?.user) ? <>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li>
                    </> : <>
                        <li className='nav-item pointer'>
                            <a onClick={logout} className='nav-link'>Logout</a>
                        </li>
                    </>
                }
            </ul>
        </>
    )
};

export default Menu;