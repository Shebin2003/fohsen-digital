import React,{ useContext,useEffect,useState } from 'react'
import './Selection.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Selection = () => {
    const [fetchedData,setFetchedData] = useState([])
    useEffect(()=>{
      async function fetchdata(){
        const request = await axios.get("http://localhost:3001/api/Patients")
        setFetchedData(request.data)
        return request
      }
      fetchdata()
    },[])
    const navigate = useNavigate();
  return (
    <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
            {fetchedData.map((option, index) => {
            return (
              <tr key={index} onClick={() =>{
                        navigate("/prediagnosis", {state: option })
                        console.log('options :',option)
                        }}>
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

export default Selection
