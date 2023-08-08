import React, { useState } from 'react';
import { Select } from 'antd';
import Jumbotron from '../../components/cards/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import { useAuth } from '../../context/auth';

const Product = () => {
    const [auth, setAuth] = useAuth();
    const [photo,setPhoto] = useState();
    const [categories,setCategories] = useState();
    return (
        <>
            <Jumbotron title={auth?.user?.name} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-light p-3 h4">Product</div>
                        {photo && <div className='text-center pb-2'>
                                <img src={URL.createObjectURL(photo)} className='img img-responsive' height="200px" alt="" srcset="" />
                            </div>}
                        {/* <ul className="list-group">
                            <li className="list-group-item">Create product form ....</li>
                        </ul> */}
                        <div class="mb-3">
                            <label for="formFile" class="btn btn-primary col-12">{photo ? photo.name: "Upload Photo"}<input onChange={(e)=>setPhoto(e.target.files[0])} hidden type="file" id="formFile" /></label>

                        </div>

                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                {
                                    value: '1',
                                    label: 'Not Identified',
                                },
                                
                            ]}
                        />

                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;