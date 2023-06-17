import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import EditForm from './EditForm';
import {FaDumbbell} from 'react-icons/fa';
import { IconContext } from "react-icons";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import {  toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';

function Cards({ workout }) {

    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();
    const [isModal, setIsModel] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editHandle = () =>{
        setIsModel(!isModal)
        
    }

    const notify = () => toast.success('Deleted successfully!', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });


    const handleClick = async ()=>{
        
        if(!user){
            return
        }

       const response = await fetch(`http://localhost:4000/api/workout/${workout._id}`,{
        method:'DELETE',
        headers:{
            'Authorization': `Bearer ${user.token}`
        }
       })
    const json = await response.json();
    
    if(response.ok){
        notify()
        dispatch({
            type:'DELETE_WORKOUT',
            payload: json
        })
    }
    }
    
    return (
        <>
        
        <Card style={{ width: '18rem' , marginBottom:'20px'}}>
            
            <Card.Body>
            <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
            <div>
            <FaDumbbell/>
            </div>
          </IconContext.Provider>
            
                <Card.Title>{workout.name}</Card.Title>
                <Card.Text as="h6">
                    {workout.description}
                </Card.Text>
                <Card.Text>
                    {workout.type}
                </Card.Text>
                <Card.Text>
                    {`${workout.duration} minutes`}
                </Card.Text>     
                <Card.Text>
                    {workout.date}
                </Card.Text>
                <div className='d-flex justify-content-between  ' style={{ width: '9rem' }}>
                <Button variant='secondary' onClick={editHandle} >Edit</Button>
                <Button className='nav-btn' onClick={handleShow} >Delete</Button>
                </div>
                
            </Card.Body>
        </Card>
        {isModal && <EditForm workout={workout}/>}

        {/* Modal confirm */}
        {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>you Want to delete this record!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
          <Button variant='danger'onClick={handleClick}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default Cards