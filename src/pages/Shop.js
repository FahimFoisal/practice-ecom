import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import Jumbotron from '../components/cards/Jumbotron';
import { useAuth } from '../context/auth';

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [checked,setChecked] = useState([]);
    const [radio,setRadio] = useState([]);
    const [auth,setAuth] = useAuth('');

    useEffect(()=>{
        loadCategoris();
        loadProducts();
    },[]);

    const loadCategoris = async () => {
        try{
            const {data} = await axios.get('/categories');
            setCategories(data);
        } catch(err) {
            console.log(err);
        }
    }

    const loadProducts = async () => {
        try{
            const {data} = await axios.get('/products');
            setProducts(data);
        } catch(err) {
            console.log(err);
        }
    }

    const handleCheck = (e,id) => {
        console.log(`checked = ${e.target.checked}`,id);
      };

    return (
        <>
            <Jumbotron title={auth?.user?.name}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            Filter by Categories
                        </h2>
                        <div className="row">
                            {
                                categories.map((c) => (<Checkbox key={c._id} onChange={(e)=>handleCheck(e,c._id)}>{c.name}</Checkbox>))
                            }
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="bg-light p-3 h4">Admin Info</div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;