import React from 'react';
import { Row, Col, Card, Button, ListGroup, Form} from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

function Blog({ blog, handleToggle, toggle }) {
  return (
    <Card className='my-3 p-3 rounded colorcrd' key={blog._id} section1 >
    <Link to={`/blogs/${blog._id}`}>
      <Card.Img src={blog.image} className="card-img-top my-2" alt="Imagen" style={{ width: 492, height: 330 }}/>
    </Link>        
      <Card.Header onClick={()=>handleToggle(blog._id)} style={{cursor:"pointer"}}> <h6>{(blog._id===toggle)?'-':'+'} <strong>{blog.name}</strong> </h6></Card.Header>
      <Card.Title>Autor: {blog.author}</Card.Title>
      <Card.Title>Fecha de Creación: <Moment format="DD/MM/YYYY hh:mm:ss">{blog.createdAt}</Moment></Card.Title>
      <Card.Title>Duración: 5min.</Card.Title>           
      {(blog._id===toggle)?
        <Card.Body>
          <h6 className='text-info'>{blog.comment}</h6>
        </Card.Body> 
        : ''}
    </Card>
  )
}

export default Blog