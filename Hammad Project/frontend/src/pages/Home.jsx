import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';

import Card from '../components/Card';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar1 from '../components/Navbar';
import NoData from '../components/NoData';


function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workout/',{
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      
      const json = await response.json()
      
      if (response.ok) {
       dispatch({
        type: 'SET_WORKOUTS',
        payload: json
       })
      }
    }
    if(user){
      fetchWorkouts()
    }
    
    
  }, [user])
  
  return (
      <Container fluid>
         <Row>
          <Col lg={9} md={8}>
          <Navbar1/>
            <Row className="justify-content-md-center">
              
              {workouts.map((workout) =>
                <Col md="auto" key={workout._id }>
                  <Card workout={workout} />
                </Col>
              )}
              {workouts.length < 1 && <NoData/>}
            </Row>
          </Col>
          <Col lg={3} md={4}>
            <WorkoutForm/>
          </Col>
        </Row>
      </Container>
  )
}

export default Home