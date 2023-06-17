import React from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import img from '../assets/landing-img.png';
function LandingPage() {
  return (
    <Container >
      <Row className='mt-5 pt-5'>
        <Col md="6">
            <div className='text-div'>
                <h1> <span>Fitness</span> Fitness the way you manage your workout routine!</h1>
                <p>Our digital workout portal is an innovative and secure solution that allows you to manage your fitness on-the-go.</p>
                <Link to='/login'>
                <Button variant="light" className='nav_btn2'>Lets Go</Button>
                </Link>
            </div>
        </Col>
        <Col md="6">
        <img className='img-fluid' src={img} alt="img"  />
        </Col>
      </Row>
      
    </Container>
  )
}

export default LandingPage