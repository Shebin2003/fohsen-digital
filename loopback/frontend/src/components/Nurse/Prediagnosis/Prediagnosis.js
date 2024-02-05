import React,{ useContext,useState } from 'react'
import './Prediagnosis.css'
import Button from 'react-bootstrap/Button';
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

const Prediagnosis = () => {
    const location = useLocation();
    const data = location.state;
    const staff_id = localStorage.getItem('staff_id')
    const [inputs , setInputs] = useState({
        height:"",
        weight:"",
        bp:"",
        date:"",
        temperature:"",
        diagnosisBy:staff_id,
    })
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({...inputs,[name] : value})
      }

    const navigate = useNavigate();
    const handleSubmit = async(event)=>{
        event.preventDefault()
        const newRecord = {...inputs}
        try {
            await axios.post('http://localhost:3001/api/Consultations', {patientId:data['patientId'],status:"pending"});
            console.log("newRecord",newRecord)
            axios.get("http://localhost:3001/api/Consultations").then((response) => {
                const temp = response.data[response.data.length-1]
                newRecord['consultationId'] = temp.consultationId
                newRecord['patientId'] = temp.patientId
                axios.post('http://localhost:3001/api/PreDiagnoses', newRecord);
            })
          } catch (error) {
            console.log(error);
          }
          navigate("/nursehome") 
    }

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
                
                <Button variant="outline-success" size='lg' onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
    </div>
  )
}

export default Prediagnosis
