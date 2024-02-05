import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {useNavigate } from "react-router-dom";

function Header() {
  const type = localStorage.getItem('type')
  const navigate = useNavigate();
  const handleSubmit = (event)=>{
    event.preventDefault()
    if(type=="doctor"){
      navigate("/doctorhome") 
    }
    else if(type=="nurse"){
      navigate("/nursehome") 
    }
    else{
      navigate("/")
    }
}
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={handleSubmit}>Fohsen</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Header
