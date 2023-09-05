import React from 'react'
import './Login.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"


function Login() {
  const [inputs , setInputs] = useState({
    username:"",
    password:""
})
const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({...inputs,[name] : value})
  }
const navigate = useNavigate();
const handleSubmit = (event)=>{
    event.preventDefault()
    const newRecord = {...inputs}
    console.log(newRecord)
    navigate("/home")
}
  return (
   <div className='containers'>
        <div className='heading'>Sign in</div>
        <div className='form'>
          <label className='label'>
              username <br/>
              <input className='inputs' name='username' type='text' onChange={handleInput} value={inputs.username} />
          </label><br/>
          <label className='label'>
              password <br/>
              <input className='inputs' name='password' type='password' onChange={handleInput} value={inputs.password}  />
          </label><br/>
          <Button variant="outline-success" onClick={handleSubmit}>Log in</Button>
        </div>
   </div>
  )
}

export default Login
