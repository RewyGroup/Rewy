import React, {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import './Notification.css';
function Notification(props) {

    const {notificationList} = props;



const notificationCardList = notificationList && notificationList.map((notification,index) => <Card key={index}
className={`${notification.shown ?  "notificationCardShown" : "notificationCard"}`}>
<Card.Body className="notificationText">
    <img className="notificationCardImage" src={notification.notification.user.profileImageUrl} alt="profile" />
{notification.notification.notificationText}
</Card.Body>
</Card>);

console.log(notificationList);


        return (

        <div>
            {notificationCardList}           
    </div>
        );
}

export default Notification;