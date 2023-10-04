import React,{ useContext,useState,useEffect } from 'react'
import './Registration.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Detailscontext from '../../../context/details/Detailscontext';

const Basicdetails = () => {
    const a = useContext(Detailscontext)
    const [inputs , setInputs] = useState({
        patient_id:"",
        name:"",
        age:"",
        address:"",
        gender:""
    })
    const navigate = useNavigate();
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({...inputs,[name] : value})
      }
    const handleSubmit = async(event)=>{
        event.preventDefault()
        const newRecord = {...inputs}
        a.push(newRecord)
        console.log(newRecord)
        // axios.request({
        //     method:'POST',
        //     url:'http://localhost:3000/api/Patients',
        //     data:JSON.stringify(newRecord)
        // }).then(response=>{
        //     console.log("successfull")
        // })
        try {
            const response = await axios.post('http://localhost:3000/api/Patients', newRecord);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        navigate("/prediagnosis",{ state:newRecord })
    }
    const options = [
        {label:"Male",value:"m"},
        {label:"Female",value:"f"}
    ]

  return (
    <div className='container'>
        <div className='form'>
            <h1 className='heading'>ENTER DETAILS OF PATIENT</h1>
            <form>
                <label className='label'>
                    Name :
                    <br/>
                    <input className='input' name='name' type='text' placeholder='Enter your name' onChange={handleInput} value={inputs.name}/>    
                </label>  
                <br/>
                <label className='label'>
                    Age :
                    <br/>
                    <input className='input' name='age'  type='date' placeholder='Enter your age' onChange={handleInput} value={inputs.age}/>    
                </label>
                <br/>
                <label className='label'>
                    Address
                    <br/>
                    <input className='input'  name='address' type='text' placeholder='Enter your address' onChange={handleInput} value={inputs.address}/>    
                </label><br/>
                <label className='label'>
                    Gender :<br/>
                    <select onChange={handleInput} value={inputs.gender} name='gender' >
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

export default Basicdetails
