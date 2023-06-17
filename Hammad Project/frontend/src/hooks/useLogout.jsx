import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';
import {  toast } from 'react-toastify';

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const {dispatch: workoutDispatch} = useWorkoutsContext();

  const notify = () => toast.success(' Logout successfully!', {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const logout = () => {
    notify();
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })

    workoutDispatch({type: 'SET_WORKOUTS', payload: []})

  }

  return { logout }
}