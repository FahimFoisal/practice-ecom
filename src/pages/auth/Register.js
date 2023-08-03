import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import Jumbotron from '../../components/cards/Jumbotron';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/auth';
import Loading from '../../components/routes/Loading';




// const onFinish = (values) => {
//     console.log('Success:', values);
// };
// const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };

const Register = () => {
    const [name, setName] = useState("admin");
    const [email, setEmail] = useState("pr@gmail.adm");
    const [password, setPassword] = useState("123456");
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();

    const handleSubmit =  async (e) => {
        e.preventDefault();
        //console.log(`${process.env.REACT_APP_API}/register`)
        try {
            const {data} = await axios.post(`/register`,{
                name,email,password
            })
            console.log(data)
            if (data?.error) {
                toast.error(data.error);
            }
            else {
                localStorage.setItem("auth",JSON.stringify(data));
                setAuth({...auth,user:data.user,token:data.token});
                navigate('/');
                toast.success("Registration Successful!")
            }

        } catch (err) {
            toast.error("Registration Failed!")
        }
    }
    return (
        <div>
            <Jumbotron title={"Register"} />
            <form className='w-50 m-auto' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="username" className="form-label">Name</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="username"/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {/* <Form className='m-auto'
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name={name}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form> */}

        </div>
    );
};

export default Register;