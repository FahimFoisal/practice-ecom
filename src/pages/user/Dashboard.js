import React from 'react';
import { useAuth } from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';
import UserMenu from '../../components/nav/UserMenu';

const Dashboard = () => {
    const [auth,setAuth] = useAuth();
    return (
        <>
            <Jumbotron title={auth?.user?.name}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="bg-light p-3 h4">User Info</div>
                        <ul className="list-group">
                            <li className="list-group-item">{auth?.user?.name}</li>
                            <li className="list-group-item">{auth?.user?.email}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;