import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuthContext } from '../hooks/useAuthContext';
import {  toast } from 'react-toastify';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import '../index.css'

function EditForm({ workout }) {
const  { name, description, type, duration, date } = workout

const {workouts,dispatch} = useWorkoutsContext();
const {user} = useAuthContext();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const [name1, setName] = useState(name);
  const [description1,setDescription] = useState(description);
  const [type1, setType] = useState(type);
  const [duration1, setDuration] = useState(duration);
  const [date1, setDate] = useState(date);
  const [error,setError] = useState(null)
  const [emptyFields , setEmptyFields] = useState([])
  
  const getCurrentDate = () =>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  const notify = () => toast.success(' Record updated successfully!', {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  // Handle the onChnage state of  name
  const handleChangeName = (e) => {
    const { value } = e.target;

    // Check if the input value contains spaces
      
      const hasNumbers = /\d/.test(value);

    // If spaces are found, prevent updating the input state
    if ( hasNumbers) {
      return;
    }

    // Update the input state if no spaces are found
    setName(value)
    
  };
  
   // Handle the onChnage state of  description
   const handleChangeDescription = (e) => {
    const { value } = e.target;

    setDescription(value)
    
  };

  // Handle the onChnage state of  name
  const handleChangeDuration = (e) => {
    const { value } = e.target;

    // Check if the input value contains spaces
      const hasSpaces = /^\d{0,3}$/.test(value);
      // const hasNumbers = /\d/.test(value);

    // If spaces are found, prevent updating the input state
    if (hasSpaces && value !== '0') {
      setDuration(value )
     
    }
    // return;

    // Update the input state if no spaces are found
    // setDuration(value)
    
  };

  const handleSubmit = async () =>{
    const updatedWorkout = { name:name1,description:description1,type:type1,duration:duration1,date:date1}
      console.log(workout._id);
      console.log('new record',updatedWorkout);

      if(name1.trim() === "" ){
        setError('input field can not be empty!')
        return
      }

      if(description1.trim() === "" ){
        setError('input field can not be empty!')
        return
      }
        try {
        const response = await fetch(`http://localhost:4000/api/workout/${workout._id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(updatedWorkout),
         
       })
    
       notify();   
    const json = await response.json();
    console.log('data added successfully from backend',json);
    if(response.ok){
     
        dispatch({
            type:'UPDATE_WORKOUT',
            payload: json
        })
        handleClose()
        
    }
        } catch (error) {
            console.log(error);
        }  

        console.log(workouts);
  }
  return (
    <>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update the activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <form className='workout-form mx-auto' >
        {/* <h5>Update Activity</h5> */}
        <label htmlFor="name">Name</label>
        <input id='name' type="text" onChange={ handleChangeName } value={name1} className={emptyFields.includes('name') ? 'error': ''} required maxLength="20"
        />
        <label htmlFor="Description">Description</label>
        <input id='Description' type="text" onChange={handleChangeDescription } value={description1} className={emptyFields.includes('description') ? 'error': ''} maxLength="40"
        />
        <label htmlFor="type">Select Exercise Type:</label>
        
      <select id="type" onChange={(val)=>setType(val.target.value)} value={type1} className={emptyFields.includes('type') ? 'error': ''}>
        <option value="run">Run</option>
        <option value="bicycle">Bicycle</option>
        <option value="swim">Swim</option>
        <option value="ride">Ride</option>
        <option value="walk">Walk</option>
        <option value="hike">Hike</option>
      </select>
      
      <label htmlFor="duration">Duration</label>
        <input id='duration' type="number" onChange={handleChangeDuration } value={duration1}  className={emptyFields.includes('duration') ? 'error': ''}
        />
         <label htmlFor="date">Date</label>
        <input id='date' type="date"  min={getCurrentDate()} onChange={(val)=>setDate(val.target.value) } value={date1} className={emptyFields.includes('date') ? 'error': ''}
        />
        {/* <Button onClick={ handleSubmit} className='nav-btn mt-2'>Add</Button> */}
        {error && <div className='error'>{error}</div>}
    </form>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditForm
