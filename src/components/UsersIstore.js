import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
function UsersIstore() {
    const [user,setUser] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:5000/user`).then((response) => {setUser(response.data) })
    },[]);
  return (
    <div className='login'>
        <Container>
            <Row>
      {user.map((user) => { return(
        <Col>
        <div className='my-3' >
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`http://localhost:5002/${user.image}`} />
         <ListGroup variant="flush">
           <ListGroup.Item>Username: {user.username}</ListGroup.Item>
           <ListGroup.Item>Email: {user.email}</ListGroup.Item>
           <ListGroup.Item>isActive: {user.isActive===true ? 'true' : 'false'}</ListGroup.Item>
           {user.isActive===true ?<>
           <Button className='my-2' onClick={()=>{navigate(`/blockuser?id=${user._id}`)}} >Block</Button>
           </>:<>
           <Button className='my-2' onClick={()=>{navigate(`/unblockuser?id=${user._id}`)}} >Unblock</Button>
           </>}
          </ListGroup>
       </Card>
        </div>
        </Col>
      )})}
      </Row>
      </Container>
    </div>
  )
}

export default UsersIstore
