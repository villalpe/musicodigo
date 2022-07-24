import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBoxPodcast from '../components/SearchBoxPodcast';
import { listPodcasts } from '../actions/podcastActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Podcast from '../components/Podcast';



function PodcastScreen({ match }) {
    /*const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')*/
    const [toggle, setToggle] = useState(null);
    const dispatch = useDispatch()
    const podcastList = useSelector(state => state.podcastList)
    const {error, loading, podcasts} = podcastList    
  
    const { id } = useParams();
    let navigate = useNavigate();
    let keyword = useLocation().search

    
    let handleToggle=(id)=>{
        if(toggle===id){
            setToggle(null);
            return false
        }
       setToggle(id)
       
    }
    
    useEffect(() => {
      dispatch(listPodcasts(keyword))
    }, [dispatch, keyword])

    /*const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {
            rating,
            comment
        }))
    }*/

    return (
    <div className='section1'>
        <Link className='btn btn-light m-1 section1' style={{ backgroundColor: '#27365A', color: '#00DDFF'}} to='/'>Go Back</Link>
            {loading ? 
              <Loader /> 
              : error ? <Message variant='danger'>{error}</Message>
              :
              <div>
                <Row>
                  <Col lg={8}>
                    <h2 className='my-4'>Pódcast</h2>                  
                  </Col>
                  <Col lg={4}>
                    <h5>Buscar un pódcast:</h5>
                    <SearchBoxPodcast />                  
                  </Col>
                </Row>  
                <Row>
                  {podcasts.map(podcast => (
                    <div key={podcast._id} sm={12} md={6} lg={4} xl={3}>
                      <Podcast handleToggle={handleToggle} toggle={toggle} podcast={podcast} />
                    </div>
                ))}
                </Row>              
              </div>
            }
        </div>
          )
        }


export default PodcastScreen