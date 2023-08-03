import React from 'react';
import AdminMenu from '../../components/nav/AdminMenu';
import Jumbotron from '../../components/cards/Jumbotron';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
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
                        <div className="bg-light p-3 h4">Admin Info</div>
                        <ul className="list-group">
                            <li className="list-group-item">{auth?.user?.name}</li>
                            <li className="list-group-item">{auth?.user?.email}</li>
                            <li className="list-group-item">{auth?.user?.role}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;