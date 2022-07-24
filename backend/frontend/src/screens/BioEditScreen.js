import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProfileDetails, updateProfile } from '../actions/profileActions';
import FormContainer from '../components/FormContainer'
import { PROFILE_UPDATE_RESET } from '../constants/profileConstants'

function BioEditScreen() {

    const { id } = useParams()
    const profileId = id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')    
    const [bio, setBio] = useState('')
    const [comment, setComment] = useState('')
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const profileDetails = useSelector(state => state.profileDetails)
    const { loading, profile, error } = profileDetails

    const profileUpdate = useSelector(state => state.profileUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = profileUpdate    

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: PROFILE_UPDATE_RESET })
            navigate(`/profilelist`)
        }else{
            if(!profile.name || profile._id !== Number(profileId)){
                dispatch(getProfileDetails(profileId))
            }else{
                setName(profile.name)
                setImage(profile.image)
                setBio(profile.bio)
                setComment(profile.comment)
            }
        }
    }, [profile, profileId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProfile({
            _id: profileId,
            name,
            bio,
            image,
            comment,
        }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('profile_id', profileId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/profiles/upload/', formData, config)


            setImage(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
  return (
    <div className='section1'>
    <Link to='/profilelist' className='btn btn-light m-1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1>Editar Profile</h1>
         {loadingUpdate && <Loader />}
         {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}  
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
         (
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name' className='my-1'>
               <Form.Label><h3>Nombre</h3></Form.Label>
               <Form.Control
                   type='name'
                   placeholder='Ingresa el nombre'
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               >
               </Form.Control>
           </Form.Group>

            <Form.Group controlId='bio' className='my-3 form-outline w-100'>
                <Form.Label><h3>Bio</h3></Form.Label>
                <Form.Control
                    type='textarea'
                    placeholder={'Ingresa tu Bio'}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className='textarea'
                    rows="8"
                >
                </Form.Control>
            </Form.Group>
           
           <Form.Group className='my-3'>
               
               <Form.Label><h3>Avatar</h3></Form.Label>
               <Form.Text><b><p className='text-danger'>avatar 640x425 - peso +- 80k</p></b></Form.Text>
               <Form.Control
                   type='text'
                   placeholder='Ingresa la Imagen'
                   value={image}
                   onChange={(e) => setImage(e.target.value)}
               >
               </Form.Control>

               <Form.Control
                   type='file'
                   id='image-file'
                   label='Choose Image'
                   custom
                   onChange={uploadFileHandler}
                   class="form-control-file"
               >
               
               </Form.Control>
               {uploading && <Loader />}                    
           </Form.Group>
           
           <Form.Group controlId='comment' className='my-1'>
                <Form.Label><h3>Aficiones</h3></Form.Label>
                <Form.Control
                    type='textarea'
                    placeholder='Ingresa tus Aficiones'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='textarea'
                    rows="5"
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

export default BioEditScreen