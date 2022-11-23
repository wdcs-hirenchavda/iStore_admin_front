import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Navbar1 from './Navbar1';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
function Products() {
    const navigate = useNavigate();
    const [product,setProduct] = useState([])

    const productItems = async()=>{

      await axios.get(`http://localhost:5000/product`).then((response) =>{setProduct(response.data) });
    }
    useEffect( () => {
      productItems()
    },[])

    const deleteProduct = async (id)=>{

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {

         
          
          let deleteitems= await axios.delete(`http://localhost:5000/product/${id}`)
      
          if(deleteitems.data !==undefined ){
            Swal.fire({
              position: 'top',
        icon: 'success',
        title: 'Your product has been deleted successfully',
        showConfirmButton: false,
        timer: 2000
      })
      productItems();
    }
  }
  })
  }
  return (
    <div className='login' >
      <Navbar1/>
      
        <h1>iStore Products</h1>
        <Button onClick={()=>{navigate('/add-product')}} >Add Product</Button>
        <div className='my-3' >
        <Container>
          <Row>
           {product.map((product) => { return(
            <Col>
            <div className='my-3' >

             <Card style={{ width: '18rem' }}>
             <Card.Img variant="top" src={product.image} />
             <ListGroup variant="flush">
               <ListGroup.Item>Name: {product.name}</ListGroup.Item>
               <ListGroup.Item>Price: {product.price}</ListGroup.Item>
               <ListGroup.Item>Category: {product.category}</ListGroup.Item>
               <ListGroup.Item>Company: {product.company}</ListGroup.Item>
               <ListGroup.Item> 
                 <Button onClick={()=>{navigate(`/update-product?_id=${product._id}`)}} >Edit Product</Button> 
                 <Button className='btn btn-danger my-2' onClick={()=>{deleteProduct(`${product._id}`)}} >Delete Product</Button> 
                </ListGroup.Item> 
             </ListGroup>
           </Card>
            </div>
            </Col>
           )
           })}
            </Row>
        </Container>
        </div>
      </div>
  )
}

export default Products
