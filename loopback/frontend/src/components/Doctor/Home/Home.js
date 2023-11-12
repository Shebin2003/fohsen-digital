import React from 'react'
import './Home.css'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='container'>
        <div className='contents'>
        <h1 className='heading'>CHOOSE YOUR OPTION</h1>
        <div className='d-grid gap-2"'>
            <Button className='button1' variant="outline-light" size='lg' onClick={()=>navigate("/consultation")}>Consultation</Button>
            <Button className='button2' variant="outline-light" size='lg' onClick={()=>navigate("/history1")}>Patient history</Button>
            <Button className='button2' variant="outline-light" size='lg' onClick={()=>navigate("/addsymptoms",{ state:1   })}>Add new symptom</Button>
        </div>
        </div>
    </div>
  )
}

export default Home
