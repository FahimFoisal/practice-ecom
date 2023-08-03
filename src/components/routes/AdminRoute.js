import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Loading from './Loading';
import { Outlet } from 'react-router';

const AdminRoute = () => {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();
    useEffect(()=> {

        const adminCheck = async () => {
            const {data} = await axios.get('/admin-check');
            data?.ok ? setOk(true) : setOk(false)
        }

        if (auth?.token) adminCheck();
    },[auth?.token])
    return ok ? <Outlet></Outlet> : <Loading path=""/>;
};

export default AdminRoute;