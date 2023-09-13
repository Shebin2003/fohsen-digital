import React,{ useContext,useState } from 'react'
import "./Symptoms.css"
import { useNavigate,useLocation } from 'react-router-dom';
import Symptomcontext from '../../../context/symptoms/Symptomcontext'
import Button from '@mui/material/Button';

const Symptoms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const s = useContext(Symptomcontext)
  
  const values = []
  
  const handleInput = (event) => {
    values.push({s_id:event.target.value,name:event.target.name})
  }
  
  const handleSubmit = ()=>{
    data.symptoms=values
    navigate("/diagnosis",{ state:data })
  }
  const changepage = ()=>{
    navigate("/addsymptoms", { state:data })
  }
  return (
    <div>
      <br/><h1 className='headings'>Select symptoms of patient</h1><nr/>
      <div className='buttonss'>
      <Button variant="contained" color="success" onClick={handleSubmit} >Submit</Button>
      <Button variant="contained"  onClick={changepage}>Add new symptoms</Button></div>
      <table className='table'>
        <thead>
              <tr>
                    <th>  </th>
                    <th>Name</th>
                    <th>Description</th>
              </tr>
          </thead>
          <tbody>
          {s.map((option, index) => {
            return (
              <tr>
                <td>{<input type='checkbox'  onChange={handleInput} value={option.s_id}  name={option.name}></input>}</td>
                <td>{option["name"]}</td>
                <td>{option["description"]}</td>
              </tr>
            );
          })}  
          </tbody>
      </table>
    </div>
  )
}

export default Symptoms
