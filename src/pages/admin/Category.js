import React from 'react';
import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';

const Category = () => {
    const [auth,setAuth] = useAuth();
    return (
        <>
            <Jumbotron title={auth?.user?.name}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="bg-light p-3 h4">Category</div>
                        <ul className="list-group">
                            <li className="list-group-item">Create category form ....</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;