import React from 'react'
import '../../components/Login/Login.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Adminnewregisterpage = () => {
    const [inputs , setInputs] = useState({
        name:"",
        password:"",
        type:"doctor"
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
        axios.post('http://localhost:3001/addstaff', newRecord);
        alert("Registeration successfull");
        navigate("/")
    }

    const options = [
      {label:"Doctor",value:"doctor"},
      {label:"Nurse",value:"nurse"}
  ]
  return (
    <div className='containers'>
        <div className='heading'>Register new staff</div>
        <div className='form'>
          <label className='label'>
              username <br/>
              <input className='inputs' name='name' type='text' onChange={handleInput} value={inputs.name} />
          </label><br/>
          <label className='label'>
              password <br/>
              <input className='inputs' name='password' type='password' onChange={handleInput} value={inputs.password}  />
          </label><br/>
          <label className='label'>
                    type <br/>
                    <select onChange={handleInput} value={inputs.type} name='type' >
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                                ))}
                    </select>
                </label> <br/><br/>
          
          <Button variant="outline-success" onClick={handleSubmit}>Register</Button>
        </div>
   </div>
  )
}

export default Adminnewregisterpage
