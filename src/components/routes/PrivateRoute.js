import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Outlet } from 'react-router';
import Loading from './Loading';

const PrivateRoute = () => {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();
    
    useEffect(()=>{
        const authCheck = async () => {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/auth-check`,{
                headers: {
                    authorization: auth?.token
                }
            });
            (data?.ok) ? setOk(true) : setOk(false); 
        }
        if (auth?.token) authCheck();
    },[auth?.token]);
    return ( ok ? <Outlet/>: <Loading/>);
};

export default PrivateRoute;