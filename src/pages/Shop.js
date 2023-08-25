import axios from "axios";
import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { Radio } from "antd";
import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";
import { prices } from "./prices";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [auth, setAuth] = useAuth("");

  useEffect(() => {
    if (!checked.length || !radio.length) loadProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) loadFilterProducts();
  }, [checked, radio]);

  useEffect(() => {
    loadCategoris();
  }, []);

  const loadFilterProducts = async () => {
    try {
      const { data } = await axios.post(`/filtered-products`, {
        checked,
        radio,
      });
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCategoris = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (isChecked, id) => {
    let all = [...checked];
    if (isChecked) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const handleRadio = (e) => {
    setRadio(e.target.value);
  };

  return (
    <>
      <Jumbotron title={auth?.user?.name} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Categories
            </h2>
            <div className="row">
              {categories.map((c) => (
                <div>
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                </div>
              ))}
            </div>
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Price
            </h2>
            <div className="row p-3">
              <Radio.Group onChange={handleRadio} value={radio}>
                {prices.map((p) => (
                  <div>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="p-5 pt-0">
              <button
                className="btn btn-outline-secondary col-12"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {/* <div className="bg-light p-3 h4">
              {JSON.stringify(checked, null, 4)}
            </div>
            <div className="bg-light p-3 h4">
              {JSON.stringify(radio, null, 4)}
            </div> */}
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {products?.length} Products
            </h2>

            <div
              className="row"
              style={{ height: "100vh", overflow: "scroll" }}
            >
              {products?.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
