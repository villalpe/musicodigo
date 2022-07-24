import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

 
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
  <header>
    <Navbar expand="lg" collapseOnSelect className='fixed-top' style={{backgroundColor: "#090D3A"}} >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <LinkContainer to='/'>
          <Navbar.Brand href="/">
            <img src="/images/MusiCodigo_2.png" style={{ width: 407, height: 75}} resizeMode='contain' alt='logo' className='mx-5'/>                             
          </Navbar.Brand>
        </LinkContainer>        
            <Navbar.Collapse id="basic-navbar-nav" className='mx-5'>
            <Nav className="ms-auto">
                <LinkContainer to='#' className='colorMenu' >
                  <Nav.Link href="https://facebook.com/"><i class="fab fa-facebook-square"></i></Nav.Link>                
                </LinkContainer>
                <LinkContainer to='#' className='colorMenu'>
                  <Nav.Link href='href="https://instagram.com/"'><i class="fab fa-instagram"></i></Nav.Link>                
                </LinkContainer>
                <LinkContainer to='#' className='colorMenu'>
                  <Nav.Link href="https://twitter.com/"><i class="fa-brands fa-twitter"></i></Nav.Link>                
                </LinkContainer>                                        
                <NavDropdown title={ <span className="colorMenu">Proyectos</span> } id="nav-dropdown" >
                  <LinkContainer to='/projectlist' className='colorMenu'>
                    <NavDropdown.Item>Publicar Proyecto</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/project' className='colorMenu'>
                    <NavDropdown.Item>Proyectos</NavDropdown.Item>
                  </LinkContainer>                  
                </NavDropdown>
                <NavDropdown title={ <span className="colorMenu">Grabaciones</span> } id="nav-dropdown" >
                  <LinkContainer to='/recordinglist' className='colorMenu'>
                    <NavDropdown.Item>Publicar Grabación</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/recordings' className='colorMenu'>
                    <NavDropdown.Item>Grabaciones</NavDropdown.Item>
                  </LinkContainer>                  
                </NavDropdown>
                <NavDropdown title={ <span className="colorMenu">Blog</span> } id="nav-dropdown" >
                  <LinkContainer to='/bloglist' className='colorMenu'>
                    <NavDropdown.Item>Publicar Blog</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/blogs' className='colorMenu'>
                    <NavDropdown.Item>Blogs</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>                
                <NavDropdown title={ <span className="colorMenu">Pódcast</span> } id="nav-dropdown" >
                  <LinkContainer to='/podcastlist' className='colorMenu'>
                    <NavDropdown.Item>Publicar Pódcast</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/podcasts' className='colorMenu'>
                    <NavDropdown.Item>Pódcast</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/podcastgrid' className='colorMenu'>
                    <NavDropdown.Item>Pódcast Libre</NavDropdown.Item>
                  </LinkContainer>                  
                </NavDropdown>
                <NavDropdown title={ <span className="colorMenu">Recursos</span> } id="nav-dropdown" >
                  <LinkContainer to='/resourcelist' className='colorMenu'>
                    <NavDropdown.Item>Publicar Recurso</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/resource' className='colorMenu'>
                    <NavDropdown.Item>Recursos</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <NavDropdown title={ <span className="colorMenu">Radio</span> } id="nav-dropdown" >
                  <LinkContainer to='/podcasts' className='colorMenu'>
                    <NavDropdown.Item>Radio</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <NavDropdown title={ <span className="colorMenu">Forum</span> } id="nav-dropdown">
                  <LinkContainer to={'/forumlist'} className='colorMenu'>
                    <NavDropdown.Item>Forum</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>                               

                {userInfo ? (
                  <NavDropdown title={<span className='colorMenu'>{userInfo.name}</span>} id='username'>
                      <LinkContainer to={'/profile'} className='colorMenu'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={'/profilelist'} className='colorMenu'>
                          <NavDropdown.Item>Comunidad</NavDropdown.Item>
                      </LinkContainer>                      
                          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>                          
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login' className='colorMenu'>
                    <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                  </LinkContainer>
                )
              }
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={ <span className="colorMenu">Admin</span> } id='adminmenu' style={{backgroundColor: '#090D3A'}}>
                  <LinkContainer to={'/admin/userlist'} className='colorMenu'>
                      <NavDropdown.Item>Usuarios</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>                    
              )}
            </Nav>
            </Navbar.Collapse>
 
    </Navbar>    
  </header>

  )
}

export default Header