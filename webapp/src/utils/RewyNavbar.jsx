import React from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import {signOut} from '../actions/login';
import './RewyNavbar.css'
import LoginButton from '../components/Login/LoginButton'


function RewyNavbar() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.loginReducer.isLoggedIn);

    return (

<Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
  <Navbar.Brand href="/"><img width="20%" src="/RewyIcon.png"/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    <FontAwesomeIcon className="dropdown-icon" icon={faSearch} />
    <Nav>
    <Nav.Link href="/question/all">Browse Questions</Nav.Link>
    </Nav>
    {!isLoggedIn ? 
      <Nav >
      <Nav.Link href="/login"><LoginButton/></Nav.Link>
    </Nav>:
    <NavDropdown title={ <FontAwesomeIcon className="dropdown-icon" icon={faUser} />} id="collasible-nav-dropdown">

        <NavDropdown.Item href="/profile">profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => dispatch(signOut())}>Sign out</NavDropdown.Item>
      </NavDropdown>}
  </Navbar.Collapse>
</Navbar>
    ); 
}
export default RewyNavbar;