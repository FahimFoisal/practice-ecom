import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const { data } = await axios.get("/products");
    console.log(data)
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Jumbotron title={"Hello! Welcome to Ecommerce"} />
      <div className="row">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">New Arrivals</h2>
            <div className="col-md-6 p-3">
                {
                    products?.map((p) => (<ProductCard key={p._id} p={p}/>))
                }
            </div>
        </div>
        <div className="col-md-6">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">Best Sellers</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
