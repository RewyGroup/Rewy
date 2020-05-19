import React, {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Overlay,Popover} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Notification from './Notification';
import {getNotificationById,setNotificationsToShown} from '../../actions/notification';

function NotificationDropdownList(props) {

    const {token} = props
    

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [notifierWarning,setNotifierWarning] = useState(false);
    const [newNotifications,setNewNotifications] = useState(0);

    const dispatch = useDispatch();
    const userId = useSelector(state => state.loginReducer.user.id);
    const optionalNotifications = useSelector(state => state.notificationReducer.notifications);

   useEffect(() =>{

    if(userId){
    dispatch(getNotificationById(userId,token));
    }
    },[userId]);

  
    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
      dispatch(setNotificationsToShown(userId,token));
      setNotifierWarning(false);
    };


    const notificationList = optionalNotifications && <Notification notificationList={optionalNotifications}/>; 
    
    

    useEffect(() =>{

       if(optionalNotifications.length > 0){
           console.log(optionalNotifications);
           
        var counter = optionalNotifications.filter(notification => notification.shown===false).length;
        if(counter > 0){
            setNotifierWarning(true);
            setNewNotifications(counter);
        }

       }    
    },[optionalNotifications]);

        return (
        <div className="notification-list">
        {notifierWarning?<div className="notificationCounter">{newNotifications}</div>:<div className="notificationCounterOff"></div>}
      <FontAwesomeIcon className="dropdown-icon" onClick={handleClick} icon={faBell} /> 
      <Overlay className="notificationOverlay"
        show={show}
        target={target}
        placement="bottom"
        containerPadding={10}
      >
        <Popover id="popover-contained" className="notificationPopover">
            {notificationList}
            <Popover.Content className="notificationFooter">
            <a  href="/notifications">see more notifications</a>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
        );
}

export default NotificationDropdownList;