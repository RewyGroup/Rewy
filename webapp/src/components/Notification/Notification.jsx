import React from 'react';
import {Card,Col,Row} from 'react-bootstrap';
import './Notification.css';
import moment from 'moment';

function Notification(props) {
    const {notification} = props;
    var date = moment(notification.notification.createdAt).fromNow();

        return (

<Card
className={`${notification.shown ?  "notificationCardShown" : "notificationCard"}`}>
<Card.Body className="notificationText">
    <Row className="notificationCreatedAt  m-0 "><Col xs={12}>{date}</Col></Row>
    <Row className="m-0">
   <Col xs={1} className="p-0"> <img className="notificationCardImage" src={notification.notification.user.profileImageUrl} alt="profile" />
   </Col>
    <Col xs={11} className="pr-0">
    <div className="notificationText">{notification.notification.notificationText}</div>
    </Col>
    </Row>


</Card.Body>
</Card>);

        
}

export default Notification;