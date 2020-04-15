import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';


 function LoginForm() {

    const [username, setUsername] = useState('kenny');

    return (

    <div><Button>{username}</Button></div>

    );


 }

 export default LoginForm