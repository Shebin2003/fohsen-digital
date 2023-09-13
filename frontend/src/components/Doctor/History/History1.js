import React,{ useContext } from 'react'
import './History1.css'
import Detailscontext from '../../../context/details/Detailscontext'
import { useNavigate } from 'react-router-dom';

const History1 = () => {
    const a = useContext(Detailscontext)
    const navigate = useNavigate();
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
            {a.map((option, index) => {
            return (
              <tr key={index} onClick={() =>{
                        navigate("/history2", {state: option })
                        }}>
                <td>{option["id"]}</td>
                <td>{option["name"]}</td>
                <td>{option["age"]}</td>
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
