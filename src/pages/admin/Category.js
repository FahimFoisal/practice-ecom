import React, { useState } from 'react';
import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import { Modal } from 'antd';
import CategoryForm from '../../components/forms/CategoryForm';

const Category = () => {
    const [auth, setAuth] = useAuth();

    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatingName, setUpdatingName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleUpdate = (e) => {
        e.preventDefault();
    }
    const handleDelete = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Jumbotron title={auth?.user?.name} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-light p-3 h4">Category</div>
                        <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit} />
                        <hr />
                        <div className='col'>
                            {
                                categories?.map((c) =>{
                                    <button key={c._id} className='btn btn-outline-success m-3' onClick={()=> {
                                        setVisible(true);
                                        setSelected(c);
                                        setUpdatingName(c.name);
                                    }}>
                                        {c.name}
                                    </button>
                                })
                            }
                        </div>
                        <Modal
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            footer={null}
                        >
                            <CategoryForm
                                value={updatingName}
                                setValue={setUpdatingName}
                                handleSubmit={handleUpdate}
                                buttonText="Update"
                                handleDelete={handleDelete}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;