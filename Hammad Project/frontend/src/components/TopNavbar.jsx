import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IconContext } from "react-icons"
import { Link } from 'react-router-dom'
import logo from "../assets/fitness-logo.png";
import Button from 'react-bootstrap/Button';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
function TopNavbar() {

  const {user} = useAuthContext();

  const {logout} = useLogout();

  const handleCLick = () =>{
    logout()
  }

  return (
    <header className='container-fluid'>
      <div className='container'>
        <Link to='/'>
          <img src={logo} width='100px' alt="logo" />
        </Link>
        {user && (
          <div className='nav-side'>
          <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
            <div>
              <FaUserCircle />
            </div>
          </IconContext.Provider>
          <h5>{user.firstName}</h5>
          <Button onClick={handleCLick} className='nav-btn'>Signout</Button>
        </div>
        )}

        {!user && (
          <div className='btn-div'>
            <Link to='/login'>
          <Button  className='nav-btn mx-1'>Login</Button>
          </Link>
          <Link to='/signup'>
          <Button  className='nav-btn mx-1'>Signup</Button>
          </Link>
          
        </div>
        )}

      </div>
    </header>
  )
}

export default TopNavbar