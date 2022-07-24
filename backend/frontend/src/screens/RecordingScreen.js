import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxRecording from '../components/SearchBoxRecording';
import { listRecordings, listRecordingDetails, createRecording } from '../actions/recordingActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Recording from '../components/Recording';
import { RECORDING_CREATE_DETAILS_RESET } from '../constants/recordingConstants'
import Moment from 'react-moment';


function RecordingScreen({ match }) {
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    
    const recordingList = useSelector(state => state.recordingList)
    const {error, loading, recordings} = recordingList
   
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
       dispatch(listRecordings(keyword))
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
          <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/' >Go Back</Link>
              {loading ? 
                <Loader /> 
                : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                  <Row>
                    <Col lg={6} className='d-flex justify-content-start align-items-center'>
                      <h3 className='mx-3'>Grabaciones</h3>                  
                    </Col>
                    <Col lg={6} className='d-flex justify-content-end align-items-center'>
                      <h5 className='px-1'>Buscar una Grabación:</h5>
                      <SearchBoxRecording />                  
                    </Col>
                  </Row>                    
                  <Row className='mx-1'>
                    {recordings.map(recording => (
                       <Col key={recording._id} lg={6}>
                        <Recording handleToggle={handleToggle} toggle={toggle} recording={recording} />
                       </Col>                        
                     
                  ))}

                  </Row>

                </div>
              }
          </div>
            )

        }


export default RecordingScreen