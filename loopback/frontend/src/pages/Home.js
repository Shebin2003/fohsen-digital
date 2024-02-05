import React from 'react'
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='container'>
        <div className='contents'>
        <h1 className='heading'>   Continue as</h1>
        <div className='d-grid gap-2"'>
            <Button className='button1' variant="outline-light" size='lg' onClick={()=>navigate("/adminlogin")}>Admin</Button>
            <Button className='button2' variant="outline-light" size='lg' onClick={()=>navigate("/loginpage")}>Staff</Button>
        </div>
        </div>
    </div>
  )
}

export default Home
