import React from 'react';
import {Card} from 'react-bootstrap';
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


        return (

        <div>
            {notificationCardList}           
    </div>
        );
}

export default Notification;