import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer id="tempaltemo_footer" style={{backgroundColor: "#00DDFF" }}>
        <div class="container" style={{backgroundColor: "#090D3A" }}>
            <div class="row">

                   <div class="col-md-4 pt-5 ">
                    <a class="navbar-brand text-success logo h1 align-self-center my-1" href="index.html">
                        <Image src={'/images/Musicodigo.jpg'}  style={{ width: 255, height: 160 }} resizeMode='contain' alt='fotoP'  />
                    </a>
                    <ul class="list-unstyled text-light footer-link-list my-3">
                        <li className='my-1'>
                            <i class="fas fa-map-marker-alt fa-fw"></i>
                            <span>Facultad de Música UNAM</span>
                            <p>C. Xicoténcatl 126, Del Carmen, Coyoacán, 04100 Ciudad de México, CDMX</p>
                        </li>
                        <li className='my-1'>
                            <i class="fa fa-phone fa-fw"></i>
                            <a class="text-decoration-none" href="tel:55-77592879">55-77592879</a>
                        </li>
                        <li className='my-1'>
                            <i class="fa fa-envelope fa-fw"></i>
                            <a class="text-decoration-none" href="mailto:info@company.com">info@musicodigo.com</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-4 pt-5">
                    <h2 class="h2 text-light border-bottom pb-3 border-light">Temas</h2>
                    <ul class="list-unstyled text-light footer-link-list">
                        <li><a class="text-decoration-none" href="/recordings">Grabaciones</a></li>
                        <li><a class="text-decoration-none" href="/blogs">Blogs</a></li>
                        <li><a class="text-decoration-none" href="/forumlist">Forums</a></li>
                        <li><a class="text-decoration-none" href="/project">Projectos</a></li>
                        <li><a class="text-decoration-none" href="/podcasts">Pódcasts</a></li>
                        <li><a class="text-decoration-none" href="/podcasts">Radio</a></li>
                        <li><a class="text-decoration-none" href="/resource">Recursos</a></li>
                    </ul>
                </div>

                <div class="col-md-4 pt-5">
                    <h2 class="h2 text-light border-bottom pb-3 border-light">Mas información</h2>
                    <ul class="list-unstyled text-light footer-link-list">
                        <li><a class="text-decoration-none" href="#">Inicio</a></li>
                        <li><a class="text-decoration-none" href="#">Acerca de musicodigo</a></li>
                        <li><a class="text-decoration-none" href="#">Preguntas mas comunes</a></li>
                        <li><a class="text-decoration-none" href="#">Contacto</a></li>
                    </ul>
                </div>

            </div>

            <div class="row text-light mb-4">
                <div class="col-12 mb-3">
                    <div class="w-100 my-3 border-top border-light"></div>
                </div>
                <div class="col-auto me-auto">
                    <ul class="list-inline text-left footer-icons">
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none"  href="http://facebook.com/"><i class="fab fa-facebook-f fa-lg fa-fw"></i></a>
                        </li>
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none"  href="https://www.instagram.com/"><i class="fab fa-instagram fa-lg fa-fw"></i></a>
                        </li>
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none"  href="https://twitter.com/"><i class="fab fa-twitter fa-lg fa-fw"></i></a>
                        </li>
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none"  href="https://www.linkedin.com/"><i class="fab fa-linkedin fa-lg fa-fw"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="col-auto">
                    <label class="sr-only" for="subscribeEmail">Dirección de Correo</label>
                    <div class="input-group mb-2">

                        <Link to={'/profilelist'} className='input-group-text btn-success text-decoration-none' style={{color: '#090D3A'}}>Registrate en la Comunidad musicodigo</Link>

                    </div>
                </div>
            </div>
        </div>

        <div class="w-100 bg-black py-3">
            <div class="container">
                <div class="row pt-2">
                    <div class="col-12">
                        <p class="text-left text-light">
                            Copyright &copy; 2022 musicodigo 
                            | Designed by <a rel="sponsored" href="https://lalola.com" >lalola</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </footer>
  )
}

export default Footer