import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar1 from './components/Navbar'
import Home from './pages/Home'
import TopNavbar from './components/TopNavbar'
import './index.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useAuthContext } from './hooks/useAuthContext'
import LandingPage from './pages/LandingPage'
import ErrorPage from './pages/ErrorPage'

function App() {
  
  const {user} = useAuthContext();

  return (
    <div className='app'>
      <BrowserRouter>
      <TopNavbar/>
      
      <div className='pages'>

      <Routes>
      <Route path='/home' element={!user ? <LandingPage/> :  <Navigate to="/" />}
        />
        <Route path='/' element={user ? <Home/> : <Navigate to ="/home"/>}
        />
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to="/" />}
        />
        <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}
        />
        <Route path='/*' element={<ErrorPage/>}
        />
      </Routes>
      
      </div>

      </BrowserRouter>
    </div>
  )
}

export default App
