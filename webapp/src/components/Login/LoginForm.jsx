import React, { useState } from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedIn } from '../../actions/login';

import './LoginForm.css';

function LoginForm() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.loginReducer.error);

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
    <Container className="loginContainer">
      <Row className="loginRow">
        <Form className="loginForm" onSubmit={handleSubmit}>
         <div id="header">
          <h2>Logga in</h2>
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Control placeholder="Användarnamn" className="loginForm-control" type="text" onChange={onChangeUsername}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control placeholder="Lösenord" className="loginForm-control" type="password" onChange={onChangePassword} />
          </Form.Group>
          <Form.Group>
            <Button className="loginFormButton" type="submit">
              LOGGA IN
            </Button>
          </Form.Group>
          <Form.Group>
            <Form.Label className="loginForm-label">Har du inte redan ett konto? <a href="/register" >Registrera</a></Form.Label>
          </Form.Group>
          {errorMessage ? <div className="loginErrorMessage">{errorMessage}</div> : <div></div>}
        </Form>
      </Row>
    </Container>


  );
}

export default LoginForm;