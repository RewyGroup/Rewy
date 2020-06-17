import React, {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Overlay,Popover} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import Notification from './Notification';
import {getNotificationById,setNotificationsToShown} from '../../actions/notification';

function NotificationDropdownList(props) {
    const {token} = props;

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const [notifierWarning,setNotifierWarning] = useState(false);
    const [newNotifications,setNewNotifications] = useState(0);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.loginReducer.user.id);
    const optionalNotifications = useSelector(state => state.notificationReducer.notifications);
    const [toShownNotification,setToShownNotification] = useState([]);
    const [fiveNotifications,setFiveNotifications] = useState([]);
    
   useEffect(() =>{
    if(toShownNotification.length> 0){
      toShownNotification.forEach(function (notification){
      notification.notification.user.role =  notification.notification.user.role.toUpperCase();      

      })
      var counter = toShownNotification.length;
      if(counter > 0 && counter < 5){

        var five =[...toShownNotification];

        for(var i = 0;  i < 5-counter; i++){          
          five.push(optionalNotifications[i])

        }
        setFiveNotifications(five);
        
      }    
    }
    },[toShownNotification]);
    
   useEffect(() =>{

    if(userId){
    dispatch(getNotificationById(userId,token));
    }
    },[userId]);


    useEffect(() =>{
       if(optionalNotifications.length > 0){
        sortDesc();
        var notShownNotifications = optionalNotifications.filter(notification => notification.shown === false);
        var counter = notShownNotifications.length;


        if(counter > 0){
            setNotifierWarning(true);
            setNewNotifications(counter);
        }
        
        if(counter > 0 && counter < 5){
          
          setToShownNotification(optionalNotifications.filter(notification => notification.shown === false)); 

        }else{
          const five = optionalNotifications.splice(0,5);
          setFiveNotifications(five);
        }

        if(counter > 5){
          setToShownNotification(notShownNotifications.splice(0,5));
        }
        
       }    
    },[optionalNotifications]);


    function sortDesc(){
      optionalNotifications.sort(function(a, b){ return b.id - a.id});
    }

    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
      dispatch(setNotificationsToShown(toShownNotification,token));
      setNotifierWarning(false);
    };


    const notificationList = fiveNotifications &&  fiveNotifications.map((notification,index) => <Notification key={index} notification={notification}/>); 
    


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
          <div>
            {notificationList}
            </div>
            <Popover.Content className="notificationFooter">
            <a  href="/notifications">see fler händelser</a>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
        );
}

export default NotificationDropdownList;