import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Products = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron title={auth?.user?.name} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="bg-light p-3 h4">Products List</div>
            {products.map((p) => (
              <Link
                to={`/dashboard/admin/product/update/${p.slug}`}
                key={p._id}
              >
                <div classname="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        className="img img-fluid round-start"
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            {moment(p.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
