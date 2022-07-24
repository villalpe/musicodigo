import React from 'react';
import { Row, Col, Card, Button, ListGroup, Form} from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom'
import Message from './Message';
import Moment from 'react-moment';

function Recording({ recording, handleToggle, toggle }) {
  return (
    <Card className='my-3 p-3 rounded colorcrd' key={recording._id} section1 >
        <Card.Header>
        <audio controls preload="none" 
        >
            <source src={recording.audio_file} type="audio/mpeg" />
        </audio>
        </Card.Header>        
      <Card.Header onClick={()=>handleToggle(recording._id)} style={{cursor:"pointer"}}> <h6>{(recording._id===toggle)?'-':'+'} <strong>{recording.name}</strong> </h6></Card.Header>
      <Card.Title>Autor: {recording.author}</Card.Title>
      <Card.Title>Fecha de Creación: <Moment format="DD/MM/YYYY hh:mm:ss">{recording.createdAt}</Moment></Card.Title>
      <Card.Title>Duración: {recording.time_rec}</Card.Title>           
      {(recording._id===toggle)?
        <Card.Body>
          <h6 className='text-info'>{recording.comment}</h6>
        </Card.Body> 
        : ''}
    </Card>
  )
}

export default Recording