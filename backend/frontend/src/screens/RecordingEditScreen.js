import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listRecordingDetails, updateRecording } from '../actions/recordingActions';
import FormContainer from '../components/FormContainer'
import { RECORDING_UPDATE_RESET } from '../constants/recordingConstants'

function RecordingEditScreen() {

    const { id } = useParams()
    const recordingId = id

    const [name, setName] = useState('')
   
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const [audio_file, setAudio_file] = useState('')
    const [time_rec, setTime_rec] = useState(0)
        
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const recordingDetails = useSelector(state => state.recordingDetails)
    const { loading, recording, error } = recordingDetails

    const recordingUpdate = useSelector(state => state.recordingUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = recordingUpdate   

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: RECORDING_UPDATE_RESET })
            navigate(`/recordinglist`)
        }else{
            if(!recording.name || recording._id !== Number(recordingId)){
                dispatch(listRecordingDetails(recordingId))
            }else{
                setName(recording.name)
                setAuthor(recording.author)
                setComment(recording.comment)
                setAudio_file(recording.audio_file)
                setTime_rec(recording.time_rec)
            }
        }
    }, [recording, recordingId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateRecording({
            _id: recordingId,
            name,
            author,
            comment,
            audio_file,
            time_rec,
        }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('audio_file', file)
        formData.append('recording_id', recordingId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/recordings/uploadfile/', formData, config)


            setAudio_file(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
  return (
    <div className='section1'>
    <Link to='/recordinglist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1>Editar Grabación</h1>
         {loadingUpdate && <Loader />}
         {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}  
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
         (
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name' className='my-2'>
               <Form.Label><h3>Nombre</h3></Form.Label>
               <Form.Control
                   type='text'
                   placeholder='Ingresa el nombre'
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               >
               </Form.Control>
           </Form.Group>
          
            <Form.Group controlId='author' className='my-2'>
                <Form.Label><h3>Autor</h3></Form.Label>
                <Form.Control
                    type='text'
                    placeholder={'Ingresa el Autor'}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
          
           <Form.Group controlId='comment' className='my-2'>
                <Form.Label><h3>Comentarios</h3></Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ingresa los comentarios'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2'>
                <Form.Label><h3>Archivo de Audio</h3></Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ingresa Archivo Audio'
                    value={audio_file}
                    onChange={(e) => setAudio_file(e.target.value)}
                >
                </Form.Control>

                <Form.Control
                    type='file'
                    id='audio-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                >
                
                </Form.Control>
                {uploading && <Loader />}                    
                </Form.Group>

                <Form.Group controlId='time_rec' className='my-2'>
                    <Form.Label><h3>Duración Grabación</h3></Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingresa la duración'
                        value={time_rec}
                        onChange={(e) => setTime_rec(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
           
           <Button type='submit' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>Actualizar</Button>
       </Form>
     )} 
 </FormContainer>      
</div>
  )
}

export default RecordingEditScreen