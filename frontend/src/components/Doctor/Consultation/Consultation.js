import React,{ useContext } from 'react'
import './Consultation.css'
import Consultationcontext from '../../../context/consultation/Consultationcontext'
import { useNavigate } from 'react-router-dom';

const Consultation = () => {
    const c = useContext(Consultationcontext)
    const navigate = useNavigate();
  return (
    <div>
      <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                    {c.map((option, index) => {
                  if(option.status==="not_consulted"){
                    return (
                    <tr key={index} onClick={() =>{
                                navigate("/consultation2",{ state:option })
                                }}>
                        <td>{option["c_id"]}</td>
                        <td>{option["name"]}</td>
                    </tr>
                    );}
                })}  
            </tbody>
      </table>
    </div>
  )
}

export default Consultation
