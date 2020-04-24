import React, { useState } from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import '../Login/LoginForm.css';
import { register } from '../../actions/register';

function RegisterForm() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const errorMessage = useSelector(state => state.registerReducer.error);
  const dispatch = useDispatch();

  const onChangeUsername = event => {
    setUsername(event.target.value);
  }

  const onChangePassword = event => {
    setPassword(event.target.value);
  }

  const onChangeFirstName = event => {
    setFirstName(event.target.value);
  }

  const onChangeLastName = event => {
    setLastName(event.target.value);
  }
  const onChangeEmail = event => {
    setEmail(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    }     
    dispatch(register(user));
  }



  return (
    <Container>
      <Row>
        <Form className="form" onSubmit={handleSubmit}>
          <div id="header">
            <h2>Register</h2>
          </div>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" onChange={onChangeUsername} required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={onChangePassword}  required/>
          </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={onChangeEmail}  required/>
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" onChange={onChangeFirstName}required />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" onChange={onChangeLastName}required />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Button variant="dark" type="submit">
                Register
            </Button>
            {errorMessage ? <div>{errorMessage}</div> : <div></div>}
        </Form>
      </Row>
    </Container>


  );
}

export default RegisterForm;