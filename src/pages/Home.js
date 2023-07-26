import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import { useAuth } from '../context/auth';

const Home = () => {
    const [auth,setAuth] = useAuth();
    return (
        <div>
            <Jumbotron title={"Hello! Welcome to Ecommerce"}/>
            {/* {JSON.stringify(auth)} */}
            <p>{auth?.user?.name}</p>
        </div>
    );
};

export default Home;