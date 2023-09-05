import React from 'react'
import './Prediagnosis.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const Prediagnosis = () => {
    const [inputs , setInputs] = useState({
        height:"",
        weight:"",
        bp:"",
        temperature:"",
        diagnosedby:""
    })
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({...inputs,[name] : value})
      }
    const handleSubmit = (event)=>{
        event.preventDefault()
        const newRecord = {...inputs}
        console.log(newRecord)
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
                    <input className='input' name='height' type='number' placeholder='Height in cm' onChange={handleInput} value={inputs.height}/>
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
