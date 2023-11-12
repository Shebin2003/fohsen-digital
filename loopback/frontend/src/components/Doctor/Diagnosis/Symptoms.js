  import React,{ useContext,useState,useEffect } from 'react'
import "./Symptoms.css"
import { useNavigate,useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from "axios";

const Symptoms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  
  const values = []
  const [fetchedData,setFetchedData] = useState([])
  useEffect(()=>{
    async function fetchdata(){
      const request = await axios.get("http://localhost:3000/api/Symptoms")
      setFetchedData(request.data)
      return request
    }
    fetchdata()
  },[])
  const handleInput = (event) => {
    values.push({symptoms:event.target.value,consultationId:data['consultationId'],notes:event.target.name})
  }
  
  const handleSubmit = async()=>{
    try {
      values.map((option,index) => {
        axios.post('http://localhost:3000/api/PatientSymptoms', option);
      })
      
    } catch (error) {
      console.log(error);
    }
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
          {fetchedData.map((option, index) => {
            return (
              <tr>
                <td>{<input type='checkbox'  onChange={handleInput} value={option.symptomId}  name={option.description}></input>}</td>
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
