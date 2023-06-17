import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import '../index.css'
import { useAuthContext } from '../hooks/useAuthContext';
function Navbar1() {
  const { dispatch } = useWorkoutsContext();
  const {user} = useAuthContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      setError('You must be logged in')
      return  
    }
    // console.log({ name, description, type, duration, date });
    try {
      const workout = { name, description, type, duration, date }

      const response = await fetch('http://localhost:4000/api/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(workout),

      })
      const json = await response.json();

      if (!response.ok) {
        setError(json.error)
      }
      if (response.ok) {
        setDate('')
        setDescription('')
        setDuration('')
        setName('')
        setType('')
        setError(null)
        dispatch({
          type: 'CREATE_WORKOUT',
          payload: json
        })
        console.log('data added successfully', json);
      }

    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>

      <Navbar expand={false} className="mb-3 nav1">
        <Container fluid>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                  Offcanvas
                </Offcanvas.Title> */}
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                
              </Nav>
              <form className='workout-form mx-auto'>
                <h5>Add New Activity:</h5>
                <label htmlFor="name">Name</label>
                <input id='name' type="text" onChange={(val) => setName(val.target.value)} value={name}
                />
                <label htmlFor="Description">Description</label>
                <input id='Description' type="text" onChange={(val) => setDescription(val.target.value)} value={description}
                />
                <label htmlFor="type">Select Exercise Type:</label>

                <select id="type" onChange={(val) => setType(val.target.value)} value={type}>
                  <option value="run">Run</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="swim">Swim</option>
                  <option value="ride">Ride</option>
                  <option value="walk">Walk</option>
                  <option value="hike">Hike</option>
                </select>

                <label htmlFor="duration">Duration</label>
                <input id='duration' type="text" onChange={(val) => setDuration(val.target.value)} value={duration}
                />
                <label htmlFor="date">Date</label>
                <input id='date' type="date" onChange={(val) => setDate(val.target.value)} value={date}
                />
                <Button onClick={handleSubmit} className='nav-btn mt-2'>Add</Button>
                {error && <p text='dark'>{error}</p>}
              </form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </>
  )
}

export default Navbar1