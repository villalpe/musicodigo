import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader';
import Message from './Message'
import { listForums } from '../actions/forumActions'

function ForumCarousel() {

    const dispatch = useDispatch()
    const forumList = useSelector(state => state.forumList)
    const { forums, loading, error } = forumList

    useEffect(() => {
        dispatch(listForums())
    }, [dispatch])


  return (
    loading ? <Loader />
    : error ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel pause='hover' className='colormc carousel slide carousel-fade' data-ride='carousel'>
            {forums.map(forum => (
                <Carousel.Item key={forum._id}>
                    <Link to={`/blog/${forum._id}`}>
                        <Image className='mx-auto' img-size src={forum.image} alt={forum.name} fluid style={{ width: 600, height: 400}}/>
                        <Carousel.Caption className='carousel.caption'>
                            <h2 className='text-uppercase mb-3'><b>{forum.name}</b></h2>
                            <p style={{ color: '#ECF87F'}} className='text-uppercase'><mark>{forum.comment}</mark></p>                       
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
  )
}

export default ForumCarousel