import React from 'react'
import './Home.css'
import { Button } from 'react-bootstrap'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Registrationpage from '../../../pages/Nurse/Registrationpage'
import { useNavigate } from 'react-router-dom';
const Home = () => {  
  const navigate = useNavigate();
  return (
    <div className='container'>
        <div className='contents'>
        <h1 className='heading'>CHOOSE YOUR OPTION</h1>
        <div className='d-grid gap-2"'>
            <Button className='button1' variant="outline-light" size='lg' onClick={()=>navigate("/register")}>Register new patient</Button>
            <Button className='button2' variant="outline-light" size='lg' onClick={()=>navigate("/select")}>Already registered</Button>
        </div>
        </div>
    </div>
  )
}

export default Home
