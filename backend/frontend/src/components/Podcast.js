import React from 'react';
import { Row, Col, Card, Button} from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom'
import Moment from 'react-moment';


function Podcast({ podcast, handleToggle, toggle }) {
  return (
    <Card className='my-3 p-3 rounded' key={podcast._id}>
      <Row>
      <Col lg={5} className='colorcrd'>
        <Card.Img src={podcast.image} className="card-img-top my-2" alt="Imagen" style={{ width: 570, height: 400}}/>
      </Col>
      <Col lg={7} className='d-flex justify-content-center align-items-center colorcrd'>
        <Card.Title className='my-1'><h2><b>{podcast.name}</b></h2></Card.Title>
      </Col>
      </Row>
      <Row>
        <Col lg={12}>
        <Card.Header className='my-1' onClick={()=>handleToggle(podcast._id)} style={{cursor:"pointer"}}> <b>{(podcast._id===toggle)?'-':'+'} {podcast.name} </b></Card.Header>
        <Card.Title className='my-1'>Autor: {podcast.author}</Card.Title>
        <Card.Title className='my-1'>Fecha de Creación: <Moment format="DD/MM/YYYY hh:mm:ss">{podcast.createdAt}</Moment></Card.Title>
        <Card.Title className='my-1'>Duración: {podcast.time_pod}</Card.Title>
                  
        {(podcast._id===toggle)?
          <Card.Body className="card-body">
            <h6 className='text-info'>{podcast.comment}</h6>
          </Card.Body> 
          : ''}
          <Card.Body className='colorcrd'>
            <div>
            <audio controls preload="true" 
            >
              <source src={podcast.audio_file} type="audio/mpeg" />
            </audio>
            </div>
              <h3>Transcripción Podcast</h3>
              <div>
                Nombre: {podcast.name}
              </div>
              Autor: {podcast.author}
              <div className='card-text text-start text-break lh-1 overflow-hidden'>
                <pre><p><b>{podcast.transcription}</b></p></pre>
              </div>        
          
          </Card.Body>        
        
        </Col>
      
      </Row>



    </Card>








    
       


) 
}

export default Podcast