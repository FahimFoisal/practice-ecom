import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';


const Menu = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const logout = () => {
        setAuth({ ...auth, user: null, token: '' });
        localStorage.removeItem("auth");
        navigate("/");
    }
    const items = [
        {
          key: '1',
          label: (
            
            <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink>
          ),
        },
        {
          key: '2',
          label: (
            <NavLink className="nav-link" to="" onClick={logout}>Logout</NavLink>
          ),
        },
      ];
    return (
        <>
            <ul className='nav d-flex justify-content-around shadow-sm mb-4'>
                <li className='nav-item'>
                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className="nav-link" aria-current="page" to="/dashboard/secret">Secret</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className="nav-link" aria-current="page" to="/shop">Shop</NavLink>
                </li>
                {
                    (!auth?.user) ? <>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li>
                    </> :
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <NavLink className="nav-link" to="">
                                <Space>
                                    {auth.user.name}
                                </Space>
                            </NavLink>
                        </Dropdown>
                        
                }
            </ul>
        </>
    )
};

export default Menu;