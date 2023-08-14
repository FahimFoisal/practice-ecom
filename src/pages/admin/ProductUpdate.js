import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { Select } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
const { Option } = Select;

const ProductUpdate = () => {
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState('');
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
        const productData = new FormData ();
        productData.append('name',name);
        productData.append('description',description);
        photo && productData.append("photo",photo);
        productData.append('category',category);
        productData.append('quantity',quantity);
        productData.append('shipping',shipping);
        productData.append('price',price);

        const {data} = await axios.put(`/product/${id}`,productData);
        if (data?.error) {
            toast.error(data.error);
        }
        else {
            toast.success(`${data.name} is updated`);
            navigate(`/dashboard/admin/products`);
        }
    } catch(err) {
        toast.error(`Update Failed`);
    }
  }

  const handleDelete = async (req, res) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(`/product/${id}`);
      toast.success(`"${data.name}" is deleted`);
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };


  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setCategory(data.category._id);
      setShipping(data.shipping);
      setQuantity(data.quantity);
      setId(data._id);
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
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="bg-light p-3 h4">Product</div>
            {photo ? (
              <div className="text-center pb-2">
                <img
                  src={URL.createObjectURL(photo)}
                  className="img img-responsive"
                  height="200px"
                  alt=""
                  srcset=""
                />
              </div>
            ) :(<div className="text-center pb-2">
            <img
              src={`${process.env.REACT_APP_API}/product/photo/${id}`}
              className="img img-responsive"
              height="200px"
              alt=""
              srcset=""
            />
          </div>)}
            <div class="mb-3">
              <label for="formFile" class="btn btn-primary col-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                  type="file"
                  id="formFile"
                />
              </label>
            </div>
            <input
              type="text"
              placeholder="Write a name"
              value={name}
              className="form-control p-2 mb-3"
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="write description"
              value={description}
              className="form-control p-2 mb-3"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              className="form-control p-2 mb-3"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Select
              showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose category"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <Select
              showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose shipping"
              onChange={(value) => setShipping(value)}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
            <input
              type="number"
              placeholder="Enter quantity"
              min={1}
              value={quantity}
              className="form-control p-2 mb-3"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Update
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;
