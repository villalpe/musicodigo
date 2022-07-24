import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProjectDetails, updateProject } from '../actions/projectActions';
import FormContainer from '../components/FormContainer'
import { PROJECT_UPDATE_RESET } from '../constants/projectConstants'

function ProjectEditScreen() {

    const { id } = useParams()
    const projectId = id

    const [name, setName] = useState('')
   
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const [video_file, setVideo_file] = useState('')
    const [time_proj, setTime_proj] = useState(0)
        
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const projectDetails = useSelector(state => state.projectDetails)
    const { loading, project, error } = projectDetails

    const projectUpdate = useSelector(state => state.projectUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = projectUpdate   

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: PROJECT_UPDATE_RESET })
            navigate(`/projectlist`)
        }else{
            if(!project.name || project._id !== Number(projectId)){
                dispatch(listProjectDetails(projectId))
            }else{
                setName(project.name)
                setAuthor(project.author)
                setComment(project.comment)
                setVideo_file(project.video_file)
                setTime_proj(project.time_proj)
            }
        }
    }, [project, projectId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProject({
            _id: projectId,
            name,
            author,
            comment,
            video_file,
            time_proj,
        }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('video_file', file)
        formData.append('project_id', projectId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/projects/uploadfile/', formData, config)


            setVideo_file(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
  return (
    <div className='section1'>
    <Link to='/projectlist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1>Editar Proyecto</h1>
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
                <Form.Label><h3>Archivo de Video</h3></Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Ingresa Archivo Video'
                    value={video_file}
                    onChange={(e) => setVideo_file(e.target.value)}
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
                        value={time_proj}
                        onChange={(e) => setTime_proj(e.target.value)}
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

export default ProjectEditScreen