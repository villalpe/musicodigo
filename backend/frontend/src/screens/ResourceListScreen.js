import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Player } from 'video-react'
import { listResources, deleteResource, createResource } from '../actions/resourceActions'
import { RESOURCE_CREATE_RESET } from '../constants/resourceConstants'
import Moment from 'react-moment';


function ResourceListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [quickFilter, setQuickFilter] = useState("");
  
  const resourceList = useSelector(state => state.resourceList)
  const { loading, error, resources } = resourceList

  const resourceDelete = useSelector(state => state.resourceDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = resourceDelete

  const resourceCreate = useSelector(state => state.resourceCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, resource: createdResource } = resourceCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: RESOURCE_CREATE_RESET })
    if(!userInfo){
      navigate('/login')
    }
    
    if(successCreate){
        navigate(`/resource/${createdResource._id}/edit`)
    }else{
      dispatch(listResources(keyword))
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdResource, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este podcast?')){
      dispatch(deleteResource(id))
    }
  }

  const createProjectHandler = () => {
    dispatch(createResource())
  }

  const handleFilterChange = (event)=>{
    setQuickFilter(event.target.value);
  }
  
  return (
    <div className='section1'>
        <Row className='align-items-center'>
            <Col>
                <h1 className='text-dark-50'>Recursos</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} onClick={createProjectHandler}>
                    <i className='fas fa-plus'></i> Crear Nuevo Recurso
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
            <Table bordered hover responsive className='table-lg text-dark fs-6' style={{ backgroundColor: '#00DDFF', color: '#000'}}>
              <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>AUTOR</th>
                <th>FECHA</th>
                <th>COMENTARIOS</th>
                <th>DURACION</th>
                <th>GRABACION</th>                
                <th></th>
                <th></th>                           
              </tr>
            </thead>
            <tbody>
              {resources.map(resource => (
                <tr key={resource._id}>
                  <td>{resource._id}</td>
                  <td>{resource.name}</td>
                  <td>{resource.author}</td>
                  <td><Moment format="DD/MM/YYYY hh:mm:ss">{resource.createdAt}</Moment></td>                  
                  <td>{resource.comment}</td>
                  <td>{resource.time_proj}</td>
                  <td>
                  <Player
                    playsInline
                    src={resource.video_file}
                    className="player-wrapper"
                    width="100%"
                    height="100%"
                    />                  
                  </td>
                  <td>
                    <LinkContainer to={`/resource/${resource._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>  
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(resource._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        )  
      }
    </div>
  )
}

export default ResourceListScreen