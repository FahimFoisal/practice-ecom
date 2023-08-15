import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [checked,setChecked] = useState([]);
    const [radio,setRadio] = useState([]);

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

    return (
        <div>
            <h1>shop page</h1>
        </div>
    );
};

export default Shop;