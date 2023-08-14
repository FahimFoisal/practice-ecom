import React from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";

const Products = () => {
    const [auth,setAuth] = useAuth();
  return (
    <div>
      <Jumbotron title={auth?.user?.name} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="bg-light p-3 h4">Products List</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
