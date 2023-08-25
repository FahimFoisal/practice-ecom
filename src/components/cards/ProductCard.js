import React from "react";
import { Badge, Card, Space } from 'antd';
import { useNavigate } from "react-router";

const ProductCard = ({ p }) => {
  const navigate = useNavigate();
    <Space
    direction="vertical"
    size="middle"
    style={{
      width: '100%',
    }}></Space>
  return (
    <>
      <div className="card mb-3">
      <Badge.Ribbon text={`${p.quantity - p.sold >=1 ? `${p.quantity - p.sold} in stock` : 'out of stock'}`} placement="start" color="green">
        </Badge.Ribbon>
      <Badge.Ribbon text={`${p.sold} sold`} color="red">
      </Badge.Ribbon>
        <img
          src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
          style={{ height: "300px" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{p.name}</h5>
          <p className="card-text">{p.description?.substring(0, 150)}....</p>
          <h4 className="fw-bold">{p?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}</h4>
          <div className="d-flex justify-content-between">
            <a className="btn btn-primary" onClick={(e) => navigate(`/product/${p.slug}`)}>
              View Product
            </a>
            <a className="btn btn-primary">
                Add to Cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
