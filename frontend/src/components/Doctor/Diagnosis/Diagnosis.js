import React,{useState } from 'react'
import Button from '@mui/material/Button';
import { useLocation,useNavigate } from "react-router-dom";
import './Diagnosis.css'

const Diagnosis = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [medicine,setMedicine] = useState([])
  const [inputs,setInputs] = useState("")

  const handleChange = (event) => {
    setInputs(event.target.value)

  };
  const handleAdd = () => {
    setMedicine(prev=>{return[...prev,inputs]})
  };
  
  const handleSubmit = ()=>{
    const output = medicine.join(",")
    data["medicine"] = output
    navigate("/notes",{ state:data })
}
  
  return (
    <div className='container'>
    <div>
    <h1 className='heading'>DIAGNOSIS</h1>
      <form>
          <label className='label'>
            Medicine :<br/>
            <input className='input' name='medicine' type='text' placeholder='Click add before submitting' onChange={handleChange}  value={inputs}/>
            </label><br/>
            </form>
          <Button variant="contained" onClick={handleAdd} >Add medicine</Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
    </div>
    </div>
  )
}

export default Diagnosis
