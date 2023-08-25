import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";

const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const arr = [...products];
  const sortedBySold = arr.sort((a,b)=> (a.sold < b.sold  ? 1:-1));

  const loadProducts = async () => {
    const { data } = await axios.get(`/list-products/${page}`);
    setProducts(data);
  };

  const getTotal = async () => {
    try {
      const {data} = await axios.get('/products-count');
      setTotal(data);
    } catch(err) {
      console.log(err);
    }
  }

  const loadMore = async () => {
    try{
      setLoading(true);
      const {data} = await axios.get(`/list-products/${page}`);
      setProducts([...products,...data]);
      setLoading(false);
    } catch(err) {
        console.log(err);
        setLoading(false);
    }
  }

  useEffect(()=> {
    getTotal();
    loadMore();
  },[]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  },[page]);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Jumbotron title={"Hello! Welcome to Ecommerce"} />
      <div className="row">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">New Arrivals</h2>
            <div className="row">
                {
                    products?.map((p) => (<div className="col-md-6">
                        <ProductCard key={p._id} p={p}/>
                    </div>))
                }
            </div>
        </div>
        <div className="col-md-6">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">Best Sellers</h2>
            <div className="row">
                {
                    sortedBySold?.map((p) => (<div className="col-md-6">
                        <ProductCard key={p._id} p={p}/>
                    </div>))
                }
            </div>
        </div>
        <div className="container text-center">
          {
            (products && products.length < total && <button className="col-md-6 btn btn-warning mt-3" onClick={(e)=>{e.preventDefault(); setPage(page+1);}} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </button>)
          }
        </div>
      </div>
    </>
  );
};

export default Home;
