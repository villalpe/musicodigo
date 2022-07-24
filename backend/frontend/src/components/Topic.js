import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Topic({ topic }) {
  return (
    <Card className='my-3 p-3 rounded card-img-top colorcrd' >
        <Link to={`/topic/${topic._id}`} >
            <Card.Img src={topic.image} style={{ width: 266, height: 200 }}/>
        </Link>

        <Card.Body>
            <Link to={`/topic/${topic._id}`} className="text-decoration-none">
                <Card.Title as='div' >
                    <strong>{topic.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h5>{topic.comment}</h5>
                </div>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Topic