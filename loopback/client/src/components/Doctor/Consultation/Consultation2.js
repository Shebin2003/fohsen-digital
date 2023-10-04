import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate,useLocation } from 'react-router-dom';

const Consultation2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  return (
    <div className='container'>
        <div className='contents'>
        <h1 className='heading'>Patient name : {data["name"]}</h1>
        <div className='d-grid gap-2"'>
            <Button className='button1' variant="outline-light" size='lg' onClick={()=>navigate("/symptoms",{ state:data })}>Diagnose</Button>
            <Button className='button2' variant="outline-light" size='lg' onClick={()=>navigate("/history2",{ state:data })}>See consultation history</Button>
        </div>
        </div>
    </div>
  )
}

export default Consultation2
