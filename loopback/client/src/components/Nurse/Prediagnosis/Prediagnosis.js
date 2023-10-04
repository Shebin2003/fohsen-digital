import React,{ useContext,useState } from 'react'
import './Prediagnosis.css'
import Button from 'react-bootstrap/Button';
import Consultationcontext from '../../../context/consultation/Consultationcontext'
import { useLocation } from "react-router-dom";
import axios from "axios";
const Prediagnosis = () => {
    const location = useLocation();
    const data = location.state;
    const a = useContext(Consultationcontext)
    const [inputs , setInputs] = useState({
        id:data["id"],
        height:"",
        weight:"",
        bp:"",
        date:"",
        temperature:"",
        diagnosedby:"",
        //Next inputs are temporary(Because we have no server)
        name:data["name"],
        c_id:a.length+1,
        status:"pending",
        symptoms:"",
        notes:"",
        type:"",
        medicine:""
    })
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({...inputs,[name] : value})
      }
    
    
    const handleSubmit = (event)=>{
        event.preventDefault()
        const newRecord = {...inputs}
        a.push(newRecord)
        axios.get("http://localhost:3000/api/Patients").then((response) => {
            console.log(response.data)
          })
        console.log(a)  
    }
    
    const options = [
        {label:"alexa",value:"alexa"},
        {label:"max",value:"max"}
    ]
  return (
    <div className='container'>
        <div className='form'>
            <h1 className='heading'>PRE DIAGNOSIS</h1>
            <form>
                <label className='label'>
                    Height :<br/>
                    <input className='input' name='height' type='text' placeholder='Height in cm' onChange={handleInput} value={inputs.height}/>
                </label>
                <br/>
                <label className='label'>
                    Weight :<br/>
                    <input className='input' name='weight' type='number' placeholder='Weight in kg' onChange={handleInput} value={inputs.weight}/>
                </label>
                <br/>
                <label className='label'>
                    Bp :<br/>
                    <input className='input' name='bp' type='number' placeholder='Enter your bp' onChange={handleInput} value={inputs.bp}/>
                </label>
                <br/>
                <label className='label'>
                    temperature :<br/>
                    <input className='input' name='temperature' type='number' placeholder='Temperature in celsius' onChange={handleInput} value={inputs.temperature}/>
                </label>
                <br/>
                <label className='label'>
                    Date :<br/>
                    <input className='input' name='date' type='date' placeholder='Date of consultation' onChange={handleInput} value={inputs.date}/>
                </label><br/>
                <label className='label'>
                    Diagnosed by :<br/>
                    <select onChange={handleInput} value={inputs.diagnosedby} name='diagnosedby' >
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                                ))}
                    </select>
                </label> <br/><br/>
                <Button variant="outline-success" size='lg' onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
    </div>
  )
}

export default Prediagnosis