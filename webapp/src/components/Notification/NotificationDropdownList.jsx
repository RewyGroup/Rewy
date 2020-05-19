import React, {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Overlay,Popover} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Notification from './Notification';

function NotificationDropdownList() {


    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

  
    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    };
    

        return (
        <div className="notification-list">
            <div className="notificationCounter">2</div>
      <FontAwesomeIcon className="dropdown-icon" onClick={handleClick} icon={faBell} /> 
      <Overlay className="notificationOverlay"
        show={show}
        target={target}
        placement="bottom"
        containerPadding={10}
      >
        <Popover id="popover-contained" className="notificationPopover">
            <Notification/>
            <Popover.Content className="notificationFooter">
            <a  href="/notifications">see more notifications</a>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
        );
}

export default NotificationDropdownList;