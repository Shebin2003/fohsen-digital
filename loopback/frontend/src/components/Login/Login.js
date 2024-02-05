import React from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios";

function Login() {
  const [inputs , setInputs] = useState({
    name:"",
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
    axios.post("http://localhost:3001/checklogin",newRecord).then((response) => {
          console.log(response.data)
          const result = response.data
          console.log("hi",result)
          if (result.status=="doctor"){
            alert("Login successfull");
            localStorage.setItem('name',newRecord.name)
            localStorage.setItem('staff_id',result.staff_id)
            localStorage.setItem('type','doctor')
            navigate("/doctorhome")
          }
          else if(result.status=="nurse"){
            alert("Login successfull");
            localStorage.setItem('name',newRecord.name)
            localStorage.setItem('staff_id',result.staff_id)
            localStorage.setItem('type','nurse')
            navigate("/nursehome")
          }
          else if(result.status=="does not exist"){
            alert("User does not exist")
          }
          else{
            alert("Incorrect Password");
        }
        });
    
}
  return (
   <div className='containers'>
        <div className='heading'>Sign in</div>
        <div className='form'>
          <label className='label'>
              Name <br/>
              <input className='inputs' name='name' type='text' onChange={handleInput} value={inputs.name} />
          </label><br/>
          <label className='label'>
              password <br/>
              <input className='inputs' name='password' type='password' onChange={handleInput} value={inputs.password}  />
          </label><br/>
          <Button variant="outline-success" onClick={handleSubmit}>Log in</Button>
          <Button variant="outline-success" onClick={()=>{navigate("/")}}>Go back</Button>
        </div>
   </div>
  )
}

export default Login
