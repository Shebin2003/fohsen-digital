import React,{ useContext,useEffect,useState } from 'react'
import axios from "axios";
import '../../components/Nurse/Selection/Selection.css'
import {useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button';

const Adminviewpage = () => {
  const [fetchedData,setFetchedData] = useState([])
    useEffect(()=>{
      async function fetchdata(){
        const request = await axios.get("http://localhost:3001/api/Staffs")
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
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
            {fetchedData.map((option, index) => {
            return (
              <tr>
                <td>{option["name"]}</td>
                <td>{option["type"]}</td>
              </tr>
            );
          })}  
          <Button className='button1' variant="light" size='mb-2' onClick={()=>navigate("/adminnewregister")}>Add new staff</Button>
            <Button className='button1' variant="light" size='mb-2' onClick={()=>navigate("/")}>Logout</Button>
            </tbody>
            
      </table>

    </div>
  )
}

export default Adminviewpage