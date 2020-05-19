import React, {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import './Notification.css';
function Notification() {


const user = useSelector(state => state.userReducer.user);
const notificationCard = user && user.profileImageUrl;

useEffect(() =>{

    
    
},[user]);



        return (

        <div>
    <Card className="notificationCardShown">
    <Card.Body>This is some text within a card body.</Card.Body>
    </Card>
    <Card className="notificationCardShown">
    <Card.Body> {user ? <img className="notificationCardImage" src={notificationCard} alt="profile" />:<div></div>}This is some text within a card body.</Card.Body>
    </Card>
    <Card className="notificationCard">
    <Card.Body className="notificationText">This is some text within a card body. This is some text within a card body.This is some text within a card bodThis is some text within a card bod</Card.Body>
    </Card>
    <Card className="notificationCard">
    <Card.Body>This is some text within a card body.</Card.Body>
    </Card>
            
    </div>
        );
}

export default Notification;