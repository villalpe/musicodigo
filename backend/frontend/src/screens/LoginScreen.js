import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col,  } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? Number(location.search.split('=')[1]) : '/'
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }

        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        
    }, [navigate, redirect, userInfo])

  return (
   <div className='section1'>
    <FormContainer>
         <h1>Sign In musicodigo</h1>
         {error && <Message variant='danger'>{error}</Message>}
         {loading && <Loader />}  
         <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label><h5>Email Address</h5></Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label className='mt-2'><h5>Password</h5></Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
            </Form.Group>
            <Button type='submit' className='btn btn-light mt-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>Sign In</Button>
         </Form>

         <Row >
            <Col className='py-3'>
                Nuevo Usuario? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='fw-bolder' style={{color: '#090D3A'}}>Registrarse</Link>
            </Col>
         </Row>
    </FormContainer>
    </div>
  )
}

export default LoginScreen