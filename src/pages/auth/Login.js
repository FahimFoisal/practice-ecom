import React, { useState } from 'react';
import Jumbotron from '../../components/cards/Jumbotron';
import axios from 'axios';
import  toast  from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API}/login`,{
                email,password
            });
            if (data?.error) {
                toast.error(data.error);
            }
            else {
                localStorage.setItem('auth',JSON.stringify(data));
                setAuth({...auth,user: data.user, token: data.token});
                toast.success("Login Success!");
                navigate("/");
            }
        } 
        catch (err) {
            toast.error(err);
        }
    }
    return (
        <div>
            <Jumbotron title={"Login"}/>
            <form className='w-50 m-auto' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;