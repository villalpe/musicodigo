import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Profile from '../components/Profile'
import Grabacion from '../components/Grabacion'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProfiles } from '../actions/profileActions'
import ForumCarousel from '../components/ForumCarousel'
import UserCarousel from '../components/UserCarousel'
import Paginate from '../components/Paginate'
import picture1 from '../assets/images/studio.jpg'
import picture2 from '../assets/images/man.jpg'
import picture3 from '../assets/images/blog.jpg'
import picture4 from '../assets/images/podcast.jpg'
import picture5 from '../assets/images/earth.jpg'
import picture6 from '../assets/images/radio.jpg'
import picture8 from '../assets/images/forum.jpg'
import picture9 from '../assets/images/music-note.png'

function HomeScreen() {
  const dispatch = useDispatch()
   
  const profileList = useSelector(state => state.profileList)
  const {error, loading, profiles, page, pages} = profileList
    
  let keyword = useLocation().search
  
  useEffect(() => {
      dispatch(listProfiles(keyword))
  }, [dispatch, keyword])

  return (
    <div>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
    : 
    <div>
      <section className='text-dark-50 p-1 text-center text-sm-start section1'>
          <Row className='align-items-center justify-content-around text-center'>
            <Col lg={5} className='d-flex justify-content-center align-items-center'>
              <h1>Plataforma interactiva de <span className="colorspan"> Producción Musical </span></h1>
            </Col>
            <Col lg={7}>
                <ForumCarousel />          
            </Col>
          </Row>
      </section>
      <section className='text-dark-50 p-1 text-center text-sm-start'>
        <Row>
          <Col lg={12} className='d-flex justify-content-center align-items-center'>
            <h1>Escoge tu tema</h1>
          </Col>
        </Row>
        <Row>
        <Col lg={3} className='mb-2'>
            <Card className='mb-1 mx-1 p-3 h-100 rounded card-img-top colorcrd' >
            <Link to={'/project'} >
                <Card.Img src={picture1} style={{ width: 273, height: 200 }}/>
            </Link>
      
            <Card.Body>
                <Link to={'/project'} className="text-decoration-none">
                    <Card.Title as='div' >
                        <h2><strong>Proyectos</strong></h2>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <div className='my-3'>
                        <h5>Producciones artisticas de la comunidad.</h5>
                    </div>
                </Card.Text>
              </Card.Body>
            </Card>
        </Col>
        <Col lg={3} className='mb-2'>
            <Card className='mb-1 mx-1 p-3 h-100 rounded card-img-top colorcrd' >
            <Link to={'/recordings'} >
                <Card.Img src={picture2} style={{ width: 273, height: 200 }}/>
            </Link>
      
            <Card.Body>
                <Link to={'/recordings'} className="text-decoration-none">
                    <Card.Title as='div' >
                        <h2><strong>Grabaciones</strong></h2>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <div className='my-3'>
                        <h5>Audios y sesiones descargables para remix, sampleo o mezcla de sonido.</h5>
                    </div>
                </Card.Text>
              </Card.Body>
            </Card>
        </Col>
        <Col lg={3} className='mb-2'>
          <Card className='mb-1 mx-1 p-3 h-100 rounded card-img-top colorcrd' >
          <Link to={'/blogs'} >
              <Card.Img src={picture3} style={{ width: 273, height: 200 }}/>
          </Link>
    
          <Card.Body>
              <Link to={'/blogs'} className="text-decoration-none">
                  <Card.Title as='div' >
                      <h2><strong>Blogs</strong></h2>
                  </Card.Title>
              </Link>
              <Card.Text as='div'>
                  <div className='my-3'>
                      <h5>Articulos sobre producción musical y temas diversos.</h5>
                  </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} className='mb-2'>
          <Card className='mb-1 p-3 h-100 rounded card-img-top colorcrd' >
          <Link to={'/podcasts'} >
              <Card.Img src={picture4} style={{ width: 273, height: 200 }}/>
          </Link>
    
          <Card.Body>
              <Link to={'/podcasts'} className="text-decoration-none">
                  <Card.Title as='div' >
                      <h2><strong>Pódcast</strong></h2>
                  </Card.Title>
              </Link>
              <Card.Text as='div'>
                  <div className='my-3'>
                      <h5>Quieres escuchar contenido grabado en audio de diferentes temas...</h5>
                  </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>      
      </Row>
      <Row>
        <Col lg={3} className='mb-2'>
        <Card className='my-1 mx-1 p-3 h-100 rounded card-img-top colorcrd' >
        <Link to={'/resource'} >
            <Card.Img src={picture5} style={{ width: 277, height: 200 }}/>
        </Link>

        <Card.Body>
            <Link to={'/resource'} className="text-decoration-none">
                <Card.Title as='div' >
                    <h2><strong>Recursos</strong></h2>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h5>Tutoriales y recursos didácticos.</h5>
                </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} className='mb-2'>
        <Card className='my-1 mx-1 p-3 h-100 rounded card-img-top colorcrd' >
        <Link to={'/podcasts'} >
            <Card.Img src={picture6} style={{ width: 273, height: 200 }}/>
        </Link>

        <Card.Body>
            <Link to={'/podcasts'} className="text-decoration-none">
                <Card.Title as='div' >
                    <h2><strong>Radio</strong></h2>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h5>Podcast, conversatorios y lista de reproducción.</h5>
                </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} className='mb-2'>
        <Card className='my-1 mx-1 p-3 h-100 rounded card-img-top colorcrd' >
        <Link to={'/admin/forumlist'} >
            <Card.Img src={picture8} style={{ width: 273, height: 200 }}/>
        </Link>

        <Card.Body>
            <Link to={'/admin/forumlist'} className="text-decoration-none">
                <Card.Title as='div' >
                    <h2><strong>Forums</strong></h2>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <h5>Intercambiar información con la comunidad musicodigo...</h5>
                </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={3} className='mb-2'>
        <Card className='p-3 my-1 rounded h-100 card-img-top colorcrd d-flex justify-content-center align-itesm-center' >
            <Card.Img src={picture9} style={{ width: 275, height: 480 }} />            
        </Card>
      </Col>
      </Row>      
      </section>
        <section className='text-white p-1 mt-3 mb-3 text-center align-items-center text-sm-start'>
          <Row className='align-items-center justify-content-around text-center'>
          <Col>
            <h1 className='my-1'>Comunidad musicodigo</h1> 
          </Col>
          </Row>
          <Row>
            {profiles.map(profile => (
                <UserCarousel profile={profile}/>
            ))}
          </Row>
          <Row className='my-2'>
          <Col>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </Col>
         </Row>


        

      </section>


        
       </div>
      }
    </div>
  )
}

export default HomeScreen