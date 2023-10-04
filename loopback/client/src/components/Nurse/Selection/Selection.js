import React,{ useContext } from 'react'
import './Selection.css'
import Detailscontext from '../../../context/details/Detailscontext'
import { useNavigate } from 'react-router-dom';

const Selection = () => {
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
                        navigate("/prediagnosis", {state: option })
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

export default Selection
