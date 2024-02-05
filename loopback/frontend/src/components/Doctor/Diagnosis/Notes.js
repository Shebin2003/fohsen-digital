import React,{ useContext,useState } from 'react'
import { useLocation,useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";

const Notes = () => {
const location = useLocation();
const data = location.state;
const navigate = useNavigate();
const [inputs , setInputs] = useState("")
const handleChange = (event) => {
    setInputs(event.target.value);
  }
const consultation_by = localStorage.getItem('staff_id')
console.log("sss",consultation_by)
const handleSubmit = async() => {
    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = year + "/" + month + "/" + date;
    try {
      axios.post(`http://localhost:3001/api/Consultations/${data.consultation_id}/replace`,{consultationBy:consultation_by,notes:inputs,status:'completed',date:currentDate,patientId:data['patient_id']});
      navigate("/doctorhome")
    } catch (error) {
      console.log(error);
    }
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
