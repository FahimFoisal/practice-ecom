import React from 'react';
import Jumbotron from '../../components/cards/Jumbotron';
import AdminMenu from '../../components/nav/AdminMenu';
import { useAuth } from '../../context/auth';

const Product = () => {
    const [auth,setAuth] = useAuth();
    return (
        <>
            <Jumbotron title={auth?.user?.name} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="bg-light p-3 h4">Product</div>
                        <ul className="list-group">
                            <li className="list-group-item">Create product form ....</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;