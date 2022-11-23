import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container, Row ,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router';

function User() {
    const userdata = localStorage.getItem('user');
    const [userProduct, setUserProduct] = useState([]);
    const navigate = useNavigate()
 
    
    
    useEffect(()=>{
      (async()=>{

          await axios.get(`http://localhost:5000/product/user/${JSON.parse(userdata)._id}`).then((response)=>{setUserProduct(response.data)})
      })();
  },[userdata])

  return (
    <div className='login' >
      
      <Card style={{ width: '18rem' }}>
             <ListGroup variant="flush">
               <ListGroup.Item>Name: {JSON.parse(userdata).username}</ListGroup.Item>
               <ListGroup.Item>Email: {JSON.parse(userdata).email}</ListGroup.Item>
              </ListGroup>
           </Card>
           <h1>Your Products</h1>
           
           <Container>
            <Row>
            <button className='button' onClick={()=>{navigate('/add-product')}} >Add Product</button>
           {userProduct!=={result: 'No products found'} ? <>

             
               {userProduct.map((userPro)=>{
                 return(
                  <Col>
                   <div className='my-4'>

                   <Card style={{ width: '18rem' }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>Name: {userPro.name}</ListGroup.Item>
                  <ListGroup.Item>Price: {userPro.price}</ListGroup.Item>
                  <ListGroup.Item>category: {userPro.category}</ListGroup.Item>
                  <ListGroup.Item>company: {userPro.company}</ListGroup.Item>
                  <Button onClick={()=>{navigate(`/update-product?_id=${userPro._id}`)}} >Update Product</Button>
                 </ListGroup>
              </Card>
                   </div>
                  </Col>
                )
               })
              }
                </>:<>
   
            <h2>No Products found</h2>
           </>
          
        }
        
                    </Row>
                   </Container>

    </div>
  )
}

export default User
