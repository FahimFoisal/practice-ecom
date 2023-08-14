import React, { useEffect, useState } from "react";
import { Select } from "antd";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast"
import { useNavigate } from "react-router";
const { Option } = Select;

const Product = () => {
  const [auth, setAuth] = useAuth();
  const [photo, setPhoto] = useState();
  const [categories, setCategories] = useState([]);
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [category,setCategory] = useState('');
  const [quantity,setQuantity] = useState('');
  const [shipping,setShipping] = useState('');
  
  const navigate = useNavigate();

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const productData = new FormData ();
        productData.append('name',name);
        productData.append('description',description);
        productData.append("photo",photo);
        productData.append('category',category);
        productData.append('quantity',quantity);
        productData.append('shipping',shipping);
        productData.append('price',price);

        const {data} = await axios.post("/product",productData);

        if(data?.error) {
            toast.error(data.error);
        }
        else{
            toast.success(`${data.name} is created`);
            navigate('/dashboard/admin/products');
        }
    } catch(err) {
        toast.error("Product created failed")
    }
  }
  return (
    <>
      <Jumbotron title={auth?.user?.name} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="bg-light p-3 h4">Product</div>
            {photo && (
              <div className="text-center pb-2">
                <img
                  src={URL.createObjectURL(photo)}
                  className="img img-responsive"
                  height="200px"
                  alt=""
                  srcset=""
                />
              </div>
            )}
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
            <input type="text" placeholder="Write a name" value={name} className="form-control p-2 mb-3" onChange={(e)=> setName(e.target.value)}/>
            <textarea placeholder="write description" value={description} className="form-control p-2 mb-3" onChange={(e)=> setDescription(e.target.value)}/>
            <input type="number" placeholder="Enter price" value={price} className="form-control p-2 mb-3" onChange={(e)=> setPrice(e.target.value)}/>
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
            <input type="number" placeholder="Enter quantity" min={1} value={quantity} className="form-control p-2 mb-3" onChange={(e)=> setQuantity(e.target.value)}/>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
