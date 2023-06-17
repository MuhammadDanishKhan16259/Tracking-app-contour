import React from 'react'
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import {  toast } from 'react-toastify';

function useSignUp() {
    
    const {dispatch} = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const notify = () => toast.success(' Login successfully!', {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

    const signup = async (email, password , firstName , lastName , phone ) => {
        setIsLoading(true)
        setError(null)
    
        const response = await fetch('http://localhost:4000/api/user/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ email, password , firstName , lastName , phone })
        })
        const json = await response.json()
    
        if (!response.ok) {
          setIsLoading(false)
          setError(json.error)
        }
        if (response.ok) {
          notify()
          // save the user to local storage
          localStorage.setItem('user', JSON.stringify(json))
    
          // update the auth context
          dispatch({type: 'LOGIN', payload: json})
    
          // update loading state
          setIsLoading(false)
        }
      }
  
    return { signup, isLoading, error ,setError}
}

export default useSignUp