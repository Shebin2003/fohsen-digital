import React,{ useContext,useEffect,useState } from 'react'
import './Consultation.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Consultation = () => {
    const [consultationData,setConsultationData] = useState([])
    useEffect(()=>{
      async function fetchconsultation(){
        const request = await axios.get("http://localhost:3001/consultation")
        setConsultationData(request.data)
        return request
      }
      fetchconsultation()
    },[])
    const navigate = useNavigate();
  return (
    <div>
      <table className='table'>
            <thead>
                <tr>
                    <th>Consultation Id</th>
                    <th>Patient Name</th>
                    <th>Gender</th>
                    <th>Dob</th>
                </tr>
            </thead>
            <tbody>
                  {consultationData.map((option, index) => {
                    return (  
                    <tr key={index} onClick={() =>{
                                navigate("/symptoms",{ state:option })
                                }}>
                        <td>{option["consultation_id"]}</td>
                        <td>{option["name"]}</td>
                        <td>{option["gender"]}</td>
                        <td>{option["age"].slice(0,10)}</td>
                    </tr>
                    );
                })}  
            </tbody>
      </table>
    </div>
  )
}

export default Consultation
