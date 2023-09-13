import React,{useContext } from 'react'
import './History1.css'
import Consultationcontext from '../../../context/consultation/Consultationcontext'
import { useLocation } from "react-router-dom";

const History2 = () => {
  const location = useLocation();
  const data = location.state;
  const c = useContext(Consultationcontext)
  const values = []
  c.map((option,index) =>{
    if(option.id==data.id){
      var temp= []
      var clone = [...option.symptoms]
      clone.map((obj)=>{
        temp.push(obj.name,",")
      })
      option.symptoms2=temp.slice(0,temp.length-1)
      values.push(option)
    }
  })
  console.log("values : ",values)
  return (
    <div><br/>
      <h1 className='headingss'> {data["name"]}</h1><br/>
      <table className='table'>
        <thead>
            <tr>
                <th>Number</th>
                <th>Date</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Bp</th>
                <th>Symptoms</th>
                <th>Medicine</th>
                <th>Notes</th>
                <th>Diagnosed by</th>
            </tr>
         </thead>  
         <tbody>
         {values.map((option) => {
            return (
              <tr>
                <td>{option.c_id}</td>
                <td>{option.date}</td>
                <td>{option.height}</td>
                <td>{option.weight}</td>
                <td>{option.bp }</td>
                <td>{option.symptoms2}</td>
                <td>{option.medicine}</td>
                <td>{option.notes}</td>
                <td>{option.diagnosedby}</td>
              </tr>
            );
          })}  
          </tbody>     
      </table>
    </div>
  )
}

export default History2
