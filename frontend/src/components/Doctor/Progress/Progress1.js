import React,{ useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import Usercontext from '../../context/Usercontext'

a
function Display(props){
    return(
        <div>
            <li key={props.id}>
                    {props.name}
                    {props.bp}
                </li>
        </div>
    )
}

const Progress1 = (props) => {
    const navigate = useNavigate();
    const a = useContext(Usercontext)
    
  return (
    <div>
       <h1 className='headings'>Patients</h1>
       {a.map(Display)}
      
    </div>
  )
}

export default Progress1
