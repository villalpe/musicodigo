import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listRecordings, deleteRecording, createRecording } from '../actions/recordingActions'
import { RECORDING_CREATE_RESET } from '../constants/recordingConstants'
import Moment from 'react-moment';


function RecordingListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [quickFilter, setQuickFilter] = useState("");
  
  const recordingList = useSelector(state => state.recordingList)
  const { loading, error, recordings } = recordingList

  const recordingDelete = useSelector(state => state.recordingDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = recordingDelete

  const recordingCreate = useSelector(state => state.recordingCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, recording: createdRecording } = recordingCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: RECORDING_CREATE_RESET })
    if(!userInfo){
      navigate('/login')
    }

    if(successCreate){
        navigate(`/recording/${createdRecording._id}/edit`)
    }else{
      dispatch(listRecordings(keyword))
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdRecording, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este podcast?')){
      dispatch(deleteRecording(id))
    }
  }

  const createRecordingHandler = () => {
    dispatch(createRecording())
  }

  const handleFilterChange = (event)=>{
    setQuickFilter(event.target.value);
  }
  
  return (
    <div className='section1'>
        <Row className='align-items-center'>
            <Col>
                <h1 className='text-dark-50'>Grabaciones</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} onClick={createRecordingHandler}>
                    <i className='fas fa-plus'></i> Crear Nueva Grabación
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
              {recordings.map(recording => (
                <tr key={recording._id}>
                  <td>{recording._id}</td>
                  <td>{recording.name}</td>
                  <td>{recording.author}</td>
                  <td>{recording.comment}</td>
                  <td>{recording.time_rec}</td>
                  <td><Moment format="DD/MM/YYYY hh:mm:ss">{recording.createdAt}</Moment></td>                                    
                  <td>
                    <audio controls preload="none" 
                    >
                      <source src={recording.audio_file} type="audio/mpeg" />
                    </audio>                  
                  </td>
                  <td>
                    <LinkContainer to={`/recording/${recording._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>  
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(recording._id)}>
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

export default RecordingListScreen