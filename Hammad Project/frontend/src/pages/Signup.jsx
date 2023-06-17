import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'
import { BiEnvelope } from 'react-icons/bi'
import {BsPhone} from 'react-icons/bs' 
import {FiLock} from 'react-icons/fi'
import { IconContext } from "react-icons"
import Button from 'react-bootstrap/Button';
import useSignUp from '../hooks/useSignUp';
import {Link} from 'react-router-dom';


function Signup() {
    
    const {signup,error,isLoading, setError} = useSignUp();

    const [ formData , setFormData ] = useState({
        fname:'',
        lname:'',
        email:'',
        password:'',
        phone:''
    })
    

    // Handle the onChnage state of first name
    const handleChangeFname = (e) => {
      const { value } = e.target;
  
      // Check if the input value contains spaces
        // const hasSpaces = /\s/.test(value);
        const hasNumbers = /\d/.test(value);
  
      // If spaces are found, prevent updating the input state
      if (hasNumbers) {
        return;
      }
  
      // Update the input state if no spaces are found
      setFormData({...formData,fname:value})
      
    };
    // console.log(formData);

    // Handle the onChnage state of last name
    const handleChangeLname = (e) => {
        const { value } = e.target;
    
        // Check if the input value contains spaces
        //   const hasSpaces = /\s/.test(value);
          const hasNumbers = /\d/.test(value);
    
        // If spaces are found, prevent updating the input state
        if (hasNumbers) {
          return;
        }
    
        // Update the input state if no spaces are found
        setFormData({...formData,lname:value})
        
      };

      // Handle the onChnage state of EMAIL
    const handleChangeEmail = (e) => {
        const { value } = e.target;
    
        // Check if the input value contains spaces
          const hasSpaces = /\s/.test(value);
        //   const hasNumbers = /\d/.test(value);
    
        // If spaces are found, prevent updating the input state
        if (hasSpaces ) {
          return;
        }
    
        // Update the input state if no spaces are found
        setFormData({...formData,email:value})
        
      };

      // Handle the onChnage state of EMAIL
    const handleChangePhone = (e) => {
        const { value } = e.target;
    
        // Check if the input value contains spaces
          const hasSpaces = /[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(value);
        //   const hasNumbers = /\d/.test(value);
    
        // If spaces are found, prevent updating the input state
        if (hasSpaces ) {
          return;
        }
    
        // Update the input state if no spaces are found
        setFormData({...formData,phone:value})
        
      };
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(formData.fname.trim() === "" ){
            setError('first name can not be empty!')
            return
          }
  
          if(formData.lname.trim() === "" ){
            setError('last name can not be empty!')
            return
          }
        console.log(formData);

        await signup(formData.email,formData.password,formData.fname,formData.lname,formData.phone)

        // setFormData({
        //     fname:'',
        //     lname:'',
        //     email:'',
        //     password:'',
        //     phone:''
        //         })

    }
 
    return (
        <div className='mx-auto signup-form px-auto'>
            <h1>Register Your Account</h1>
            <p className='text-secondary'>Fill the details bellow to submit register account.</p>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} htmlFor="fname"  >
                        <Form.Label>First Name</Form.Label>
                        <InputGroup>
                            <Form.Control id="fname" type="text" placeholder="your first name" minLength="2" maxLength="20"
                            value={formData.fname}
                             onChange={handleChangeFname}
                            // onChange={(val)=>{setFormData({...formData,fname: val.target.value})}}
                             /> 
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label htmlFor="lname">Last Name</Form.Label>
                        <InputGroup>
                            <Form.Control id="lname" type="text" placeholder="your last name" minLength="2" maxLength="20"
                            value={formData.lname}
                            onChange={handleChangeLname}
                            // onChange={(val)=>{setFormData({...formData,lname: val.target.value})}}
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Col>

                        <Form.Label htmlFor="email">Email</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className='bg-white'>
                                <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                                    <div>
                                        <BiEnvelope />
                                    </div>
                                </IconContext.Provider>
                            </InputGroup.Text>
                            <Form.Control id="email" type='email' placeholder="your email" 
                            value={formData.email}
                            onChange={handleChangeEmail}
                            // onChange={(val)=>{setFormData({...formData,email: val.target.value})}}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label htmlFor="phone">Phone</Form.Label>
                        <InputGroup>
                        <InputGroup.Text className='bg-white'>
                                <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                                    <div>
                                        <BsPhone />
                                    </div>
                                </IconContext.Provider>
                            </InputGroup.Text>
                            <Form.Control type="tel"
                            maxLength="11" minLength="10" id="phone" placeholder="your phone number" 
                            value={formData.phone}
                            onChange={handleChangePhone}
                            // onChange={(val)=>{setFormData({...formData,phone: val.target.value})}}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <InputGroup>
                        <InputGroup.Text className='bg-white'>
                                <IconContext.Provider value={{ style: { fontSize: '20px' } }}>
                                    <div>
                                        <FiLock />
                                    </div>
                                </IconContext.Provider>
                            </InputGroup.Text>
                            <Form.Control type="password" id="password" placeholder="your password" minLength="7"
                            value={formData.password}
                            onChange={(val)=>{setFormData({...formData,password: val.target.value})}}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <p className='text-secondary'>By signing in, you’re agree to our <span>Terms & Condition</span>  and <span>Privacy Policy.*</span> </p>
                </Row>
                <Row className='mb-3'>
                <Button disabled={isLoading} type='submit' className='nav-btn'>Signup</Button>
                </Row>
                <Row className='mb-3'>
                    <p className='text-secondary text-center'>Already have an account <span><Link to='/login'>Login</Link></span></p>
                </Row>
            </Form>
            {error && <div className='error'>{error}</div>}
        </div>
    )
}

export default Signup