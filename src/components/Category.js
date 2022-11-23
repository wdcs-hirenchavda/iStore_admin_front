import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import Navbar1 from './Navbar1';
function Category() {
    const [category,setCategory] = useState([]);
    const navigate = useNavigate()
    const getCategory =async ()=>{
        await axios.get(`http://localhost:5000/category`).then((response) => setCategory(response.data));
    }
    useEffect( () => {
        getCategory();
    },[])

    const deleteCategory = async(categoryName)=>{
      let categoryDelete = await axios.delete(`http://localhost:5000/deleteCategory/${categoryName}`);
      if(categoryDelete.data.success){
        alert(categoryDelete.data.success)
        getCategory();
      }else{
        alert(categoryDelete.data.error)
      }
      
    }
  return (
    <div className='login' >
    <Navbar1/>
    
      <h1>iStore Categorys</h1>
      <Button className='btn btn-info' onClick={()=>{navigate('/addCategory')}} >Add Category</Button> 
      <div className='my-3' >
      <Container>
        <Row>
         {category.map((category) => { return(
          <Col>
          <div className='my-3' >

           <Card style={{ width: '18rem' }}>
           <Card.Img variant="top" src={category.image} />
           <ListGroup variant="flush">
             <ListGroup.Item>Name: {category.name}</ListGroup.Item>
             
             <ListGroup.Item> 
               {/* <Button onClick={()=>{navigate(`/update-product?_id=${category._id}`)}} >Edit Product</Button> */}
               <Button className='btn btn-danger' onClick={()=>{deleteCategory(`${category.name}`)}} >Delete Category</Button>  
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

export default Category
