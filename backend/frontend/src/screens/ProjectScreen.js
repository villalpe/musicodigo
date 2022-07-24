import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxProject from '../components/SearchBoxProject';
import { listProjects, listProjectDetails, createProject } from '../actions/projectActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Project from '../components/Project';
import { PROJECT_CREATE_DETAILS_RESET } from '../constants/projectConstants'


function ProjectScreen({ match }) {
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    /*const blogList = useSelector(state => state.blogList)
    const {error, loading, blogs} = blogList*/

    const projectList = useSelector(state => state.projectList)
    const {error, loading, projects} = projectList
   
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    /*const blogDetailCreate = useSelector(state => state.blogDetailCreate)
    const {error: errorBlogDetail, loading: loadingBlogDetail, success: successBlogDetail} = blogDetailCreate*/
  
    const { id } = useParams();
    let navigate = useNavigate();
    let keyword = useLocation().search

    
    let handleToggle=(id)=>{
        if(toggle===id){
            setToggle(null);
            return false
        }
       setToggle(id)
       
    }
    
    useEffect(() => {
       dispatch(listProjects(keyword))
    }, [dispatch, keyword])

    /*const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createBlogDetail(id, {
            rating,
            comment
        }))
    }*/

    return (
      <div className="section1">
          <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/login' >Go Back</Link>
              {loading ? 
                <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                  <Row>
                    <Col lg={6} className='d-flex justify-content-start align-items-center'>
                      <h3 className='mx-3'>Proyectos Producción Musical</h3>                  
                    </Col>
                    <Col lg={6} className='d-flex justify-content-end align-items-center'>
                      <h5 className='px-1'>Buscar un proyecto:</h5>
                      <SearchBoxProject />                  
                    </Col>
                  </Row>                    
                  <Row className='mx-1'>
                    {projects.map(project => (
                       <Col key={project._id} lg={6}>
                        <Project handleToggle={handleToggle} toggle={toggle} project={project} />
                       </Col>                        
                     
                  ))}

                  </Row>

                </div>
              }
          </div>
            )

        }


export default ProjectScreen