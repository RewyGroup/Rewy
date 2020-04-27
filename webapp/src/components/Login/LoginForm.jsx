import React, { useState } from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { checkLoggedIn } from '../../actions/login';

import './LoginForm.css';

function LoginForm() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onChangeUsername = event => {
    setUsername(event.target.value);
  }

  const onChangePassword = event => {
    setPassword(event.target.value);
  }

  const handleSubmit = event => {
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
         <div id="header">
          <h2>Login</h2>
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" onChange={onChangeUsername}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={onChangePassword} />
          </Form.Group>
          <Form.Group>
            <Button variant="dark" type="submit">
              Sign in
            </Button>
          </Form.Group>
          <Form.Group>
            <Form.Label>Don't have an account? <a href="/register" >Sign up</a></Form.Label>
          </Form.Group>
        </Form>
      </Row>
    </Container>


  );
}

export default LoginForm;