import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listTopics, deleteTopic, createTopic } from '../actions/topicActions'
import { TOPIC_CREATE_RESET } from '../constants/topicConstants'

function TopicListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const topicList = useSelector(state => state.topicList)
  const { loading, error, topics, page, pages } = topicList

  const topicDelete = useSelector(state => state.topicDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = topicDelete

  const topicCreate = useSelector(state => state.topicCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, topic: createdTopic } = topicCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: TOPIC_CREATE_RESET })
    if(!userInfo.isAdmin){
        navigate('/login')
    }

    if(successCreate){
        navigate(`/admin/topic/${createdTopic._id}/edit`)
    }else{
      dispatch(listTopics(keyword))
    }

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdTopic, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este producto?')){
      dispatch(deleteTopic(id))
    }
  }

  const createTopicHandler = () => {
    dispatch(createTopic())
  }
  
  return (
    <Container>
    <div className='section1'>
        <Row className='align-items-center'>
            <Col>
                <h1>Topicos</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3 bg-success' onClick={createTopicHandler}>
                    <i className='fas fa-plus'></i> Crear Topic
                </Button>
            </Col>            
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}        

        {loading ? 
          (<Loader />)
        : error ?
          (<Message variant='danger'>{error}</Message>)
        : (
          <div>
            <Table striped bordered hover responsive className='table-sm' style={{ backgroundColor: '#00DDFF', color: '#000'}}>
              <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>AUTOR</th>
                <th>COMENTARIO</th>
                <th></th>
                <th></th>            
              </tr>
            </thead>
            <tbody>
              {topics.map(topic => (
                <tr key={topic._id}>
                  <td>{topic._id}</td>
                  <td>{topic.name}</td>
                  <td>{topic.author}</td>
                  <td>{topic.comment}</td>
                  <td>
                    <LinkContainer to={`/admin/topic/${topic._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                   
                  </td>
                  <td>
                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(topic._id)}>
                  <i className='fas fa-trash'></i>
                    </Button>                   
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
          </div>
        )  
      }
    </div>
    </Container>
  )
}

export default TopicListScreen
