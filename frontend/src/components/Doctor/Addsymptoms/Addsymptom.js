import React,{ useState,useContext } from 'react'
import Symptomcontext from '../../../context/symptoms/Symptomcontext'
import { useNavigate,useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Addsymptoms = () => {
    const location = useLocation();
    const data = location.state;
    const s = useContext(Symptomcontext)
    const [inputs , setInputs] = useState({
        s_id:s.length+1,
        name:"",
        description:""
    })
    const navigate = useNavigate();
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({...inputs,[name] : value})
      }
    const handleSubmit = (event)=>{
        event.preventDefault()
        const newRecord = {...inputs}
        s.push(newRecord)
        console.log(data,s)
        if(data===1)
           {navigate("/doctorhome")}
        else{
            navigate("/Symptoms",{ state:data })
        } 
    }
  return (
    <div className='container'>
        <div className='form'>
            <h1 className='heading'>ENTER DETAILS OF SYMPTOM</h1>
            <form>
                <label className='label'>
                    Name :
                    <br/>
                    <input className='input' name='name' type='text' placeholder='Enter symptom' onChange={handleInput} value={inputs.name}/>    
                </label>  
                <br/>
                <label className='label'>
                    Description
                    <br/>
                    <input className='input'  name='description' type='text' placeholder='Enter description of symptom ' onChange={handleInput} value={inputs.description}/>    
                </label><br/><br/>
                <Button variant="outline-success" size='lg' onClick={handleSubmit}>Submit</Button>
            </form>        
        </div>
    </div>
  )
}

export default Addsymptoms
