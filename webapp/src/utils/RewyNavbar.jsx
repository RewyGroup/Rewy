import React from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import {signOut} from '../actions/login';
import './RewyNavbar.css'
import LoginButton from '../components/Login/LoginButton'
import NotificationDropdownList from '../components/Notification/NotificationDropdownList';
import {Cookies} from 'react-cookie';

function RewyNavbar() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.loginReducer.isLoggedIn);

  const cookies = new Cookies();
  const session_token = cookies.get("session_token");


    return (

<Navbar sticky="top" collapseOnSelect expand="md" className="rewyNavbar" >
  <Navbar.Brand href="/"><img width="65%" src="/RewyIcon.png" alt=""/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav" className="rewyNavbarContent justify-content-end">
    <FontAwesomeIcon className="dropdown-icon" icon={faSearch} />
    <Nav>
    <Nav.Link className="dropdownQuestion" href="/question/all"><h3>Kategorier</h3></Nav.Link>
    <Nav.Link className="dropdownQuestion" href="/question/all"><h3>Frågor</h3></Nav.Link>
    </Nav>
    {!isLoggedIn ? 
      <Nav >
      <Nav.Link href="/login"><LoginButton/></Nav.Link>
    </Nav>:
    <div>
      <NotificationDropdownList token={session_token}/>
    <NavDropdown className="dropdown-list" title={ <FontAwesomeIcon className="dropdown-icon" icon={faUser} />} id="collasible-nav-dropdown">

        <NavDropdown.Item href="/profile">profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => dispatch(signOut())}>Sign out</NavDropdown.Item>
      </NavDropdown></div>}
  </Navbar.Collapse>
</Navbar>
    ); 
}
export default RewyNavbar;