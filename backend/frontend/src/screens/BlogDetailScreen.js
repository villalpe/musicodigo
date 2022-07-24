import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams, useNavigate } from 'react-router-dom';
import { listBlogDetails, createBlogDetail } from '../actions/blogActions'
import { BLOG_CREATE_DETAILS_RESET } from '../constants/blogConstants'
import Moment from 'react-moment';

function BlogDetailScreen({ match }) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')    

    const { id } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const blogDetails = useSelector(state => state.blogDetails)
    const { error, loading, blog } = blogDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const blogDetailCreate = useSelector(state => state.blogDetailCreate)
    const { error: errorBlogReview, loading: loadingBlogReview, success: successBlogReview } = blogDetailCreate

    useEffect(() => {
        if(successBlogReview){
            setRating(0)
            setComment('')
            dispatch({type: BLOG_CREATE_DETAILS_RESET})
        }

        dispatch(listBlogDetails(id))
    }, [dispatch, id, successBlogReview])

 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createBlogDetail(id, {
            rating,
            comment
        }))
    }

  return (
    <div className="section1">
        <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/blogs'>Go Back</Link>
        {
            loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : (
            <div>
            <Card className='my-3 p-3 rounded colorcrd' key={blog._id} >
                <Row>
                    <Col lg={6} className='my-1'>
                        <Image src={blog.image} alt={blog.name} fluid className="card-img-top my-2" style={{ width: 570, height: 400}}/>
                    </Col>
                    <Col lg={6} className='d-flex justify-content-center align-items-center colorcrd my-1'>
                        <Card.Title>
                            <h1><b>Blog {blog.name}</b></h1>
                        </Card.Title>        
 
                    </Col>                    
                </Row>

            <Row>
                <Col md={12}>
                    <Card.Title className='text-info my-2'><h3>{blog.comment}</h3></Card.Title>                
                    <Card.Subtitle className='text-dark my-1'><h4>Comentarios</h4></Card.Subtitle>

                        {blog.reviews.length === 0 && <Message variant='info'>No hay comentarios</Message>}
                        <Card.Body >
                        {blog.reviews.map((review) => (
                            <Card.Body key={review._id} className='colorMenu'>
                                <Card.Text><strong>{review.name}</strong></Card.Text>
                                <Card.Text><p>{review.comment}</p></Card.Text>
                                <Card.Text><Moment format="DD/MM/YYYY hh:mm:ss">{review.createdAt}</Moment></Card.Text>
                                <strong><hr /></strong>
                            </Card.Body>
                        ))}
                    </Card.Body>
                    <ListGroup.Item className='colorMenu'>
                        <h4>Escribe un comentario</h4>

                         {loadingBlogReview && <Loader />}
                         {successBlogReview && <Message variant='success'>Comentario Enviado</Message>}
                         {errorBlogReview && <Message variant='danger'>{errorBlogReview}</Message>}

                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}                                    
                                    >
                                        <option value=''>Selecciona...</option>
                                        <option value='1'>1 - Pobre</option>
                                        <option value='2'>2 - Pasa</option>
                                        <option value='3'>3 - Bueno</option>
                                        <option value='4'>4 - Muy bueno</option>
                                        <option value='4'>5 - Excelente</option>                                                                                                                                                                                   
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row='5'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    >
                                    </Form.Control>                               
                                </Form.Group>
                                <Button
                                    disabled={loadingBlogReview}
                                    type='submit'
                                    variant='primary'
                                    className='btn-md my-2 text-dark'
                                >
                                    Enviar Comentario
                                </Button>
                            </Form>
                        ) : (
                            <Message variant='info'>
                                Por favor <Link to='/login'>Ingresar</Link> para escribir comentario
                            </Message>
                        )}
                    </ListGroup.Item>
                </Col>
            </Row>
            </Card>
        </div>
          )
        }
    </div>
  )
}


export default BlogDetailScreen