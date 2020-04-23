import React from 'react';
import {Navbar,Nav,Form,Button,NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



function RewyNavbar() {


    return (

<Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
  <Navbar.Brand href="/">Rewy</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/#">Register</Nav.Link>
    </Nav>
    <FontAwesomeIcon icon={faSearch} />
<NavDropdown title="dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/">profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/">Sign out</NavDropdown.Item>
      </NavDropdown>

  </Navbar.Collapse>
</Navbar>
    ); 
}
export default RewyNavbar;