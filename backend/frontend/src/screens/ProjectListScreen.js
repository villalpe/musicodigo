import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Player } from 'video-react'
import { listProjects, deleteProject, createProject } from '../actions/projectActions'
import { PROJECT_CREATE_RESET } from '../constants/projectConstants'
import Moment from 'react-moment';


function ProjectListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [quickFilter, setQuickFilter] = useState("");
  
  const projectList = useSelector(state => state.projectList)
  const { loading, error, projects } = projectList

  const projectDelete = useSelector(state => state.projectDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = projectDelete

  const projectCreate = useSelector(state => state.projectCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, project: createdProject } = projectCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: PROJECT_CREATE_RESET })
    if(!userInfo){
      navigate('/login')
    }
    
    if(successCreate){
        navigate(`/project/${createdProject._id}/edit`)
    }else{
      dispatch(listProjects(keyword))
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProject, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este podcast?')){
      dispatch(deleteProject(id))
    }
  }

  const createProjectHandler = () => {
    dispatch(createProject())
  }

  const handleFilterChange = (event)=>{
    setQuickFilter(event.target.value);
  }
  
  return (
    <div className='section1'>
        <Row className='align-items-center'>
            <Col>
                <h1 className='text-dark-50'>Proyectos</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} onClick={createProjectHandler}>
                    <i className='fas fa-plus'></i> Crear Nuevo Proyecto
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
                <th>COMENTARIOS</th>
                <th>DURACION</th>
                <th>FECHA</th>
                <th>GRABACION</th>                
                <th></th>
                <th></th>                           
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id}>
                  <td>{project._id}</td>
                  <td>{project.name}</td>
                  <td>{project.author}</td>
                  <td>{project.comment}</td>
                  <td>{project.time_proj}</td>
                  <td><Moment format="DD/MM/YYYY hh:mm:ss">{project.createdAt}</Moment></td>                                    
                  <td>
                  <Player
                    playsInline
                    src={project.video_file}
                    className="player-wrapper"
                    width="100%"
                    height="100%"
                    />                  
                  </td>
                  <td>
                    <LinkContainer to={`/project/${project._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>  
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(project._id)}>
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

export default ProjectListScreen