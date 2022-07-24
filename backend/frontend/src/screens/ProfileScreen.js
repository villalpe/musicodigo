import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Table, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listProfiles } from '../actions/profileActions'


function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    let navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const profileList = useSelector(state => state.profileList)
    const {error: errorProfiles, loading: loadingProfiles, profiles, page, pages} = profileList

    let keyword = useLocation().search

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        } else {
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listProfiles(keyword))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success, keyword])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords no coinciden')
        }else{
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')            
        }
    }

  return (
    <Container className='section1'>
        <Link to='/' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
            Go Back
        </Link>
            <Row className='mt-3'>
              <Col md={6}>
                <h1>Profile de Usuario</h1>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label><h3>Nombre</h3></Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label><h3 className='mt-2'>E-Mail</h3></Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label><h3 className='mt-2'>Password</h3></Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label><h3 className='mt-2'>Confirmar Password</h3></Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button className='btn btn-light mt-3' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} type='submit' >
                        Update
                    </Button>
                </Form>
            </Col>
    
    </Row>
    </Container>
  )
}

export default ProfileScreen
