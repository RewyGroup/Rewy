import React from 'react';
import {Navbar,Nav,NavDropdown,Dr} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import {signOut} from '../actions/login';
import './RewyNavbar.css'


function RewyNavbar() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.loginReducer.isLoggedIn);

    return (

<Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
  <Navbar.Brand href="/">Rewy</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    <FontAwesomeIcon icon={faSearch} />
    {!isLoggedIn ? 
      <Nav >
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
    </Nav>:
    <NavDropdown alignRight title={ <FontAwesomeIcon className="dropdown-icon" icon={faUser} />} id="collasible-nav-dropdown">

        <NavDropdown.Item href="/">profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => dispatch(signOut())}>Sign out</NavDropdown.Item>
      </NavDropdown>}
  </Navbar.Collapse>
</Navbar>
    ); 
}
export default RewyNavbar;