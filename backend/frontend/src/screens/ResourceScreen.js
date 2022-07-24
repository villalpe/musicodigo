import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxResource from '../components/SearchBoxResource';
import { listResources, listResourceDetails, createResource } from '../actions/resourceActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Resource from '../components/Resource';
import { RESOURCE_CREATE_DETAILS_RESET } from '../constants/resourceConstants'


function ResourceScreen({ match }) {
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    const resourceList = useSelector(state => state.resourceList)
    const {error, loading, resources} = resourceList
   
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
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
       dispatch(listResources(keyword))
    }, [dispatch,keyword])

    /*const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createBlogDetail(id, {
            rating,
            comment
        }))
    }*/

    return (
      <div className="section1">
          <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/' >Go Back</Link>
              {loading ? 
                <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                  <Row>
                    <Col lg={6} className='d-flex justify-content-start align-items-center'>
                      <h3 className='mx-3'>Recursos</h3>                  
                    </Col>
                    <Col lg={6} className='d-flex justify-content-end align-items-center'>
                      <h5 className='px-1'>Buscar nombre de Recurso:</h5>
                      <SearchBoxResource />                  
                    </Col>
                  </Row>                    
                  <Row className='mx-1'>
                    {resources.map(resource => (
                       <Col key={resource._id} lg={6}>
                          <Resource handleToggle={handleToggle} toggle={toggle} resource={resource} />
                       </Col>                        
                  ))}
                  </Row>

                </div>
              }
          </div>
            )

        }


export default ResourceScreen