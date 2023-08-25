import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Badge } from "antd";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";
import moment from 'moment';
import ProductCard from './components/cards/ProductCard';

const ProductView = () => {
    const params = useParams();
    const [product,setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);

    const loadProduct = async () => {
        try {
            const {data} = await axios.get(`/product/${params?.slug}`);
            setProduct(data);
            loadRelated(data._id,data.category._id)
        } catch (error) {
            console.log(error);
        }
    }
    const loadRelated = async (productId,categoryId) => {
        try {
            const {data} = await axios.get(`/related-products/${productId}/${categoryId}`);
            console.log(data);
            setRelatedProduct(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadProduct();
    },[params.slug])
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-9">
                    <div className="card mb-3">
                        <Badge.Ribbon text={`${product?.sold} sold`} color="red">
                            <Badge.Ribbon
                                text={`${product?.quantity >= 1
                                    ? `${product?.quantity - product?.sold} in stock`
                                    : "Out of stock"
                                }`}
                                 placement="start"
                                color="green"
                            >
                                <img
                                className="card-img-top"
                                src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                                alt={product.name}
                                style={{ height: "500px", width: "100%", objectFit: "cover" }}
                                />
                            </Badge.Ribbon>
                        </Badge.Ribbon>
                        <div className="card-body">
                            <h1 className="fw-bold">{product?.name}</h1>
                            <p className="card-text lead">{product?.description}</p>
                        </div>
                        <div className='d-flex lead fw-bold justify-content-between bg-light p-5'>
                            <div>
                                <p>
                                    <FaDollarSign /> Price:{" "}
                                    {product?.price?.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    })}
                                </p>

                                <p>
                                    <FaProjectDiagram /> Category: {product?.category?.name}
                                </p>

                                <p>
                                <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
                                </p>

                                <p>
                                {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                                {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                                </p>

                                <p>
                                <FaWarehouse /> Available {product?.quantity - product?.sold}
                                </p>

                                <p>
                                <FaRocket /> Sold {product.sold}
                                </p>
                            </div>
                        </div>
                        <div className="text-center mb-4">
                            <button type="button" className='btn btn-outline-primary card-button col-md-6'>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <h2>Related Products</h2>
                    <hr />
                    {relatedProduct?.length < 1 && <p>Nothing found</p>}
                    {relatedProduct?.map((p) => (
                        <ProductCard p={p} key={p._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductView;