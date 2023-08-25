import React from 'react';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SearchForm = () => {
    const [values,setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.get(`/products/search/${values.keyword}`);
            setValues({...values,results: data});
            navigate('/search');
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <form onSubmit={handleSubmit} className='d-flex'>
            <input type="search" className='form-control' placeholder='Search' onChange={(e) => setValues({...values,keyword: e.target.value})} value={values.keyword} id="" />
            <button type="submit" className='btn btn-primary'>Search</button>
        </form>
    );
};

export default SearchForm;