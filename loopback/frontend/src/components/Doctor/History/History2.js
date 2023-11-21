import React,{useContext,useEffect,useState} from 'react'
import './History2.css'
import { useLocation } from "react-router-dom";
import axios from "axios";

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
        <h3 className='headings2'>Age : {patientData["age"]}</h3>
        <h3 className='headings2'>Bp : {patientData.Bp}</h3>
        <h3 className='headings2'>Gender : {patientData.gender}</h3>
        <h3 className='headings2'>Height : {patientData.height}</h3>
        <h3 className='headings2'>Weight : {patientData.weight}</h3>
        <h3 className='headings2'>Consultation by : {patientData.consultationBy}</h3>
        <h3 className='headings2'>Temperature : {patientData.temperature}</h3>
        <h3 className='headings2'>Symptoms   </h3>
        <ul className='labels'>
          {symptoms.map((option)=>{
            return <li className='heading2'>{option.name}</li>
          })}
        </ul>
        <h3 className='headings2'>Medicines given   </h3>
        <ul className='labels'>
          {diagnosesData.map((option)=>{
            return <li className='heading2'>{option.MEDICINE}</li>
          })}
        </ul>
    </div>
  )
}
export default History2
