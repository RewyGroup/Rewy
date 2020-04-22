import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';



function RewyNavbar() {


    return (

    <Navbar sticky="top" bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/#">Register</Nav.Link>
    </Nav>
    </Navbar>
    ); 
}
export default RewyNavbar;