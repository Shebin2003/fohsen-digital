import React from 'react'
import '../../components/Login/Login.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Adminloginpage = () => {
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
    const handleSubmit = ()=>{
        const newRecord = {...inputs}
        console.log(newRecord)
        axios.post("http://localhost:3001/admin",newRecord).then((response) => {
          console.log(response.data)
          const result = response.data
          console.log("hi",result.status)
          if (result.status=="Authenticated"){
            alert("Login successfull");
            navigate("/adminviewpage")
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
                  username <br/>
                  <input className='inputs' name='username' type='text' onChange={handleInput} value={inputs.username} />
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

export default Adminloginpage
