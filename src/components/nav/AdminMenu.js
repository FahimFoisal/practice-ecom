import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className="bg-light p-3 h4">Admin Links</div>
            <ul className="list-group list-unstyled">
                <li><NavLink className="list-group-item" to="/dashboard/admin/category">Create Category</NavLink></li>
                <li><NavLink className="list-group-item" to="/dashboard/admin/product">Create Product</NavLink></li>
                <li><NavLink className="list-group-item" to="/dashboard/admin/products">Products</NavLink></li>
                <li><NavLink className="list-group-item" to="/dashboard/admin/">Manage Orders</NavLink></li>
            </ul>
        </>
    );
};

export default AdminMenu;