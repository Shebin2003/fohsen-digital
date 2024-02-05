import React,{useContext,useEffect,useState} from 'react'
import './History2.css'
import { useLocation } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';

const History2 = () => {
  const location = useLocation();
  const data = location.state;
  const [patientData,setPatienData] = useState({})
  const [diagnosesData,setDiagnosesData] = useState([])
  const [symptoms,setSymptoms] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    async function fetchpatient(){
      const request = await axios.get(`http://localhost:3001/patientdetails/?consultationId=${data.consultation_id}`)
      let temp = request.data[0]
      temp.age = temp['age'].slice(0,10)
      setPatienData(temp)
      return request
    }
    async function fetchdiagnoses(){
      const request = await axios.get(`http://localhost:3001/api/PatientDiagnoses/?consultationId=${data.consultation_id}`)
      setDiagnosesData(request.data)
      return request
    }
    async function fetchsymptoms(){
      const request = await axios.get(`http://localhost:3001/getsymptoms/?consultationId=${data.consultation_id}`)
      setSymptoms(request.data)
      console.log("symptoms : ",symptoms)
      return request
    }
    fetchpatient()
    fetchdiagnoses()
    fetchsymptoms()
  },[])
  return (
    <div className='container'>
      <h1 className='headings'>{patientData.name}</h1><br/>
      <Table striped bordered hover>
        <tbody>
        <tr>
          <td className='table_heading'>DOB</td>
          <td>{patientData["age"]}</td>
        </tr>
        <tr>
          <td className='table_heading'>Bp</td>
          <td>{patientData.Bp}</td>
        </tr>
        <tr>
          <td className='table_heading'>Gender</td>
          <td>{patientData.gender}</td>
        </tr>
        <tr>
          <td className='table_heading'>Height</td>
          <td>{patientData.height}</td>
        </tr>
        <tr>
          <td className='table_heading'>Weight</td>
          <td>{patientData.weight}</td>
        </tr>
        <tr>
          <td className='table_heading'>Consultation by</td>
          <td>{patientData["consultation_by"]}</td>
        </tr>
        <tr>
          <td className='table_heading'>Temperature</td>
          <td>{patientData.temperature}</td>
        </tr>
        <tr>
          <td className='table_heading'>Symptoms</td>
          <td><ul>
          {symptoms.map((option)=>{
            return <li>{option.name}</li>
          })}
          </ul></td>
        </tr>
        <tr>
          <td className='table_heading'>Medicine prescribed</td>
          <td><ul>
          {diagnosesData.map((option)=>{
            return <li >{option.MEDICINE}</li>
            {console.log("medicine:",option.MEDICINE)}
          })}
          </ul></td>
        </tr>
        </tbody>
      </Table>
    </div>
  )
}
export default History2
