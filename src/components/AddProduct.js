import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';
function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();
  const [company, setCompany] = useState("");
  const [image, setImage] = useState();
  const [error, setError] = useState(false);
  const [categoryList, setCategoryList] = useState([])
  const user = localStorage.getItem("user");

  // console.log(JSON.parse(user)._id);
  useEffect(()=>{
    (async()=>{
      await axios.get(`http://localhost:5000/category`).then((response)=>setCategoryList(response.data));
    })()
  },[])

  const addProduct = async () => {
    if (!name || !price || !company || !category || !image) {
      setError(true);
      return false;
    } else {

      const formData = new FormData();
      formData.append("name",name);
      formData.append("price",parseInt(price));
      formData.append("category", category);
      formData.append("userId", JSON.parse(user)._id);
      formData.append("company", company);
      formData.append("image", image);
      
      let data = await axios.post(`http://localhost:5000/product`,formData );
      if (data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Your Product has been Added successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/product");
      }
    }
  };
  return (
    <div>
      <div className="product ">
        <h1>Add Your Product here</h1>

        <div className="my-2 ">
          <input
            type="text"
            placeholder="Enter product name "
            className="inputBox"
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="invalid-input">Enter Product name</span>
          )}

          <input
            type="number"
            // onkeydown="return event.keyCode !== 69"
            pattern="[0-9]"
            placeholder="Enter product price "
            className="inputBox"
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && (
            <span className="invalid-input">Enter price</span>
          )}

          <select className="inputBox" onChange={(e) => setCategory(e.target.value)}>
            <option>select category</option>
            {categoryList.map((category)=>{
              return (
                <option value={category.name}>{category.name}</option>
              )
            })}
          </select>
          {error && !category && (
            <span className="invalid-input">Enter category</span>
          )}

          <input
            type="text"
            placeholder="Enter company name"
            className="inputBox"
            onChange={(e) => setCompany(e.target.value)}
          />
          {error && !company && (
            <span className="invalid-input">Enter company name</span>
          )}

      <Form.Group controlId="formFile"  className="inputBox">
        <Form.Label>Upload your Photo </Form.Label>
         <Form.Control type="file" onChange={(e)=>{setImage(e.target.files[0])}} ></Form.Control>
         </Form.Group>
         {error && !image && (
            <span className="invalid-input">Enter image</span>
          )}

          <button type="submit" className="appButton" onClick={addProduct}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
