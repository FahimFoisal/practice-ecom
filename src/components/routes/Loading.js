import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Loading = () => {
    const navigate = useNavigate();
    const [count,setCount] = useState(10);
    useEffect(()=> {
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount);
        },1000);
        count === 0 && navigate("/login");
        return () => clearInterval(interval);
    },[count]);
    return (
        <div className='text-center justify-content-center align-items-center' style={{height: "90vh"}}>
            <Spin></Spin>
        </div>
    );
};

export default Loading;