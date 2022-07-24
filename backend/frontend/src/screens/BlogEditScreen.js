import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listBlogDetails, updateBlog } from '../actions/blogActions';
import FormContainer from '../components/FormContainer'
import { BLOG_UPDATE_RESET } from '../constants/blogConstants'

function BlogEditScreen() {

    const { id } = useParams()
    const blogId = id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')    
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
        
    const [uploading, setUploading] = useState(false)    
                    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const blogDetails = useSelector(state => state.blogDetails)
    const { loading, blog, error } = blogDetails

    const blogUpdate = useSelector(state => state.blogUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = blogUpdate    

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: BLOG_UPDATE_RESET })
            navigate(`/bloglist`)
        }else{
            if(!blog.name || blog._id !== Number(blogId)){
                dispatch(listBlogDetails(blogId))
            }else{
                setName(blog.name)
                setImage(blog.image)
                setAuthor(blog.author)
                setComment(blog.comment)
            }
        }
    }, [blog, blogId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateBlog({
            _id: blogId,
            name,
            author,
            image,
            comment,
        }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('blog_id', blogId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/blogs/upload/', formData, config)


            setImage(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    
  return (
    <div className='section1'>
    <Link to='/bloglist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>
    <FormContainer>
      <h1>Editar Blog</h1>
         {loadingUpdate && <Loader />}
         {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}  
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
         (
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name' className='my-2'>
               <Form.Label>Nombre</Form.Label>
               <Form.Control
                   type='name'
                   placeholder='Ingresa el nombre'
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               >
               </Form.Control>
           </Form.Group>

            <Form.Group controlId='author' className='my-2'>
                <Form.Label><h4>Autor</h4></Form.Label>
                <Form.Control
                    type='text'
                    placeholder={'Ingresa el Autor'}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
           
           <Form.Group className='my-2'>
               <Form.Label>Imagen</Form.Label>
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
               >
               
               </Form.Control>
               {uploading && <Loader />}                    
           </Form.Group>
           
           <Form.Group controlId='comment' className='my-2'>
                <Form.Label><h4>Comentarios</h4></Form.Label>
                <Form.Control
                    type='textarea'
                    placeholder='Ingresa los comentarios'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='textarea'
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

export default BlogEditScreen