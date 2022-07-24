import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listBlogs, deleteBlog, createBlog } from '../actions/blogActions'
import { BLOG_CREATE_RESET } from '../constants/blogConstants'
import Moment from 'react-moment';

function BlogListScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const blogList = useSelector(state => state.blogList)
  const { loading, error, blogs } = blogList

  const blogDelete = useSelector(state => state.blogDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = blogDelete

  const blogCreate = useSelector(state => state.blogCreate)
  const { loading: loadingCreate, success: successCreate, error: errorCreate, blog: createdBlog } = blogCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  let keyword = useLocation().search

  useEffect(() => {
    dispatch({ type: BLOG_CREATE_RESET })
    if(!userInfo){
      navigate('/login')
    }

    if(successCreate){
        navigate(`/blog/${createdBlog._id}/edit`)
    }else{
      dispatch(listBlogs(keyword))
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdBlog, keyword])

  const deleteHandler = (id) => {
    if(window.confirm('Estas seguro de borrar este blog?')){
      dispatch(deleteBlog(id))
    }
  }

  const createBlogHandler = () => {
    dispatch(createBlog())
  }
  
  return (
    <div className='section1'>
        <Row className='align-items-center'>
            <Col>
                <h1 className='text-dark-50'>Blogs</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} onClick={createBlogHandler}>
                    <i className='fas fa-plus'></i> Crear Blog
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
                <th></th>
                <th></th>                            
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id}>
                  <td>{blog._id}</td>
                  <td>{blog.name}</td>
                  <td>{blog.author}</td>
                  <td><Moment format="DD/MM/YYYY hh:mm:ss">{blog.createdAt}</Moment></td>
                  <td>{blog.comment}</td>                  
                  <td>
                    <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>  
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(blog._id)}>
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

export default BlogListScreen