import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const Loading = (path="/login") => {
    const navigate = useNavigate();
    const location = useLocation();
    const [count,setCount] = useState(3);
    useEffect(()=> {
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount);
        },1000);
        count === 0 && navigate("/login",{state: location.pathname});
        return () => clearInterval(interval);
    },[count]);
    return (
        <div className='d-flex vh-100 justify-content-center align-items-center'>
            <Spin></Spin>
        </div>
    );
};

export default Loading;