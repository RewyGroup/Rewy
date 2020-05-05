import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './LoginButton.css'

function LoginButton() {
        return (
            <Button className="loginButton"><FontAwesomeIcon className="loginButtonIcon" icon={faUser}/>LOGIN</Button>
        );
}

export default LoginButton;