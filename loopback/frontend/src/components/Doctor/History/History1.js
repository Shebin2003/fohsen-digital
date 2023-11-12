import React,{ useContext,useEffect,useState } from 'react'
import './History1.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const History1 = () => {
    const navigate = useNavigate();
    const [consultationData,setConsultationData] = useState([])
    
    useEffect(()=>{
      async function fetchconsultation(){
        const request = await axios.get("http://localhost:3000/consultation2")
        setConsultationData(request.data)
        return request
      }
      fetchconsultation()
    },[])
  return (
    <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
            {consultationData.map((option, index) => {            
            return (
              <tr key={index} onClick={() =>{
                        navigate("/history2", {state: option })
                        }}>
                <td>{option["consultation_id"]}</td>
                <td>{option["name"]}</td>
                <td>{option["age"].slice(0,10)}</td>
                <td>{option["gender"]}</td>
                <td>{option["address"]}</td>
              </tr>
            );
          })}  
            </tbody>
      </table>
    </div>
  )
}

export default History1
