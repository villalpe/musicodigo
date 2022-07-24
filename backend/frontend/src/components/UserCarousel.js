import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image, Col, Row, Card } from 'react-bootstrap'
import Loader from './Loader';
import Message from './Message'
import picture6 from '../assets/images/radio.jpg'
import Moment from 'react-moment';

function UserCarousel( { profile }) {

    
    const profileList = useSelector(state => state.profileList)
    const { loading, error } = profileList

return (
    loading ? <Loader />
    : error ? <Message variant='danger'>{error}</Message>
    : (

        <Col key={profile._id} md={4} >
        <Card className="h-100" style={{ backgroundColor: '#27365A', color: '#fff'}}>
            <Link to={`/profile/${profile._id}`} className='d-flex justify-content-center align-items-center mt-2'>
                <Card.Img src={profile.image} class="rounded-0 img-fluid border-secondary" alt='fotoP' style={{ width: 280, height: 200}} resizeMode='contain' />
            </Link>
            <Card.Body>
                <Card.Title>
                    <span className='h4 fw-bolder text-decoration-none d-flex justify-content-center align-items-center' style={{ color: '#00FFCE '}}>{profile.name}</span>
                </Card.Title>
                <Row>
                    <Col md={12} style={{ color: '#00DDFF '}}>
                        <p style={{ color: '#00FFCE '}}>Bio</p>
                        {profile.bio}
                    </Col>
                </Row>
                <Row>
                    <Col md={12} style={{ color: '#00DDFF '}}>
                        <p className='my-3' style={{ color: '#00FFCE '}}>Aficiones</p>
                        {profile.comment}
                    </Col>
                </Row>
                <Row>
                <Col md={12} style={{ color: '#00DDFF '}}>
                    <p className='my-3' style={{ color: '#00FFCE '}}>Miembro desde</p>
                    <Moment format="DD/MM/YYYY hh:mm:ss">{profile.createdAt}</Moment>
                </Col>
                </Row>
            </Card.Body>
    </Card>
</Col>
))

  
}

export default UserCarousel