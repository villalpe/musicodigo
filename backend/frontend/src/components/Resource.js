import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Player } from 'video-react'
import "video-react/dist/video-react.css"; // import css
import Moment from 'react-moment';

function Resource({ resource }) {
  return (
    <Card className='my-3 p-3 rounded colorcrd'>
        <Card.Header>
            <h2>{resource.name}</h2>
        </Card.Header>
        <Card.Body>
  
            <Card.Title >
            <Player
                playsInline
                src={resource.video_file}
                className="player-wrapper"
                width="100%"
                height="100%"
              />
            </Card.Title>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h4 className='my-1'>{resource.comment}</h4>
                    <h6 className='my-1'>Duración: {resource.time_proj}</h6>
                    <h6>Fecha Creación: <Moment format="DD/MM/YYYY hh:mm:ss">{resource.createdAt}</Moment></h6>
                </div>
            </Card.Text>
          </Card.Body>
    </Card>
  )
}

export default Resource