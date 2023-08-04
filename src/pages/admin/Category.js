import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import { Modal } from 'antd';
import CategoryForm from '../../components/forms/CategoryForm';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Category = () => {
    const [auth, setAuth] = useAuth();

    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatingName, setUpdatingName] = useState('');

    useEffect(() => {
        loadCategories();
      }, []);
    
      const loadCategories = async () => {
        try {
          const { data } = await axios.get("/categories");
          setCategories(data);
        } catch (err) {
          console.log(err);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/category', {name});
            if (data?.error) {
                toast.error(data.error);
            }
            else {
                loadCategories();
                setName('');
                toast.success(`${name} category created!`);
            }
        } catch(err) {
            toast.error('Category creation failed!')

        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`/category/${selected._id}`, {name: updatingName});
            if (data?.error) {
                toast.error(data?.error);
            } else{
                setVisible(false);
                loadCategories();
                setUpdatingName('');
                setSelected(null);
                toast.success(`Category Successfully Updated!`);
            }
        } catch (err) {
                toast.error("Update Failed!", err)
        }
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.delete(`/category/${selected._id}`);
            if (data?.error) {
                toast.error(data?.error);
            } else{
                setVisible(false);
                loadCategories();
                setSelected(null);
                toast.success(`Category Successfully Deleted!`);
            }
        } catch (err) {
                toast.error(err)
        }
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
                                categories?.map((c) => (
                                    
                                    <button key={c._id} className='btn btn-outline-success m-3' onClick={()=> {
                                        setVisible(true);
                                        setSelected(c);
                                        setUpdatingName(c.name);
                                    }}>
                                        {c.name}
                                    </button>
                                ))
                            }
                        </div>
                        <Modal
                            open={visible}
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