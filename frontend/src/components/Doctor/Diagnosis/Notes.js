import React,{ useContext,useState } from 'react'
import { useLocation } from "react-router-dom";
import Consultationcontext from '../../../context/consultation/Consultationcontext'
import Button from '@mui/material/Button';

const Notes = () => {
const c = useContext(Consultationcontext)
const location = useLocation();
const data = location.state;

const [inputs , setInputs] = useState("")
const handleChange = (event) => {
    setInputs(event.target.value);
  };
const handleSubmit = () => {
    data["notes"] = inputs
    data["status"] = "Completed"
    const index = c.findIndex((obj) => obj.c_id==data["c_id"]);
    c[index] = data
    console.log(c)
};
  return (
    <div className='container'>
        <form>
          <label className='label'>
            Notes :<br/>
            <input className='input' name='medicine' type='text' placeholder='Enter diagnosis notes of patient' onChange={handleChange}  value={inputs}/>
            </label><br/>
            </form>
          <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default Notes
