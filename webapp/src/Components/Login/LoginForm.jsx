import React, {useState,useEffect} from 'react';
import {Form,Button,Row,Container} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {checkLoggedIn} from '../../actions/login';

import'./LoginForm.css';

function LoginForm () {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();  

  const onChangeUsername = event =>{
    setUsername(event.target.value);
  }

  const onChangePassword = event =>{
    setPassword(event.target.value);
  }

  const handleSubmit = event =>{
    event.preventDefault();
    const user = {
      username: username,
      password: password
    }
    dispatch(checkLoggedIn(user));
  }



    return (
      <Container>
        <Row>
      <Form className="form" onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="text" onChange={onChangeUsername} placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" onChange={onChangePassword} placeholder="Password" />
  </Form.Group>
  <Form.Group>
  <Button variant="dark" type="submit">
    Sign in
  </Button>
  </Form.Group>
  <Form.Group>
  <Form.Label>dont have an account? <a href="#" >Sign up</a></Form.Label>
  </Form.Group>
</Form>
</Row>
</Container>


    );
}

export default LoginForm;