import React, { useState } from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import './RegisterForm.css';
import { register } from '../../actions/register';

function RegisterForm() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation,setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
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
  const onChangeOccupation = event =>{
    setOccupation(event.target.value)
  }
  const onChangeGender = event =>{
    setGender(event.target.value)
  }
  
  const onChangeDateOfBirth = event =>{
    setDateOfBirth(event.target.value)
    console.log(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      occupation: occupation,
      gender: gender,
      dateOfBirth: dateOfBirth
    }     
    dispatch(register(user));
  }



  return (
    <Container className="registerContainer">
      <Row className="registerRow">
        <Form className="registerForm" onSubmit={handleSubmit}>
          <div id="header">
            <h2>Register</h2>
          </div>
          <Form.Group className="register-form-group" controlId="formBasicUsername">
            <Form.Label className ="registerForm-label">Username</Form.Label>
            <Form.Control className="registerForm-control" type="text" onChange={onChangeUsername} required />
          </Form.Group>

          <Form.Group className="register-form-group" controlId="formBasicPassword">
            <Form.Label className ="registerForm-label">Password</Form.Label>
            <Form.Control className="registerForm-control" type="password" onChange={onChangePassword}  required/>
          </Form.Group>

            <Form.Group className="register-form-group" controlId="formBasicEmail">
              <Form.Label className ="registerForm-label">Email</Form.Label>
              <Form.Control className="registerForm-control" type="email" onChange={onChangeEmail}  required/>
            </Form.Group>

            <Form.Group className="register-form-group" controlId="formBasicFirstName">
              <Form.Label className ="registerForm-label">First name</Form.Label>
              <Form.Control className="registerForm-control" type="text" onChange={onChangeFirstName}required />
            </Form.Group>

            <Form.Group className="register-form-group" controlId="formBasicLastName">
              <Form.Label className ="registerForm-label">Last name</Form.Label>
              <Form.Control className="registerForm-control" type="text" onChange={onChangeLastName}required />
            </Form.Group>

            <Form.Group className="register-form-group" controlId="formBasicOccupation">
              <Form.Label className ="registerForm-label">Occupation</Form.Label>
              <Form.Control className="registerForm-control" type="text" onChange={onChangeOccupation}  required/>
            </Form.Group>


            <Form.Group  className="register-form-group">
      <Form.Label className ="registerForm-label">Gender</Form.Label >
      <div>
        <Form.Check inline required
          type="radio"
          label="Male"
          value="Male"
          name="Gender"
          id="formHorizontalRadios1"
          onChange={onChangeGender}

        />
        <Form.Check inline
          type="radio"
          label="Female"
          value="Female"
          name="Gender"
          id="formHorizontalRadios2"
          onChange={onChangeGender}
        />
        <Form.Check inline
          type="radio"
          label="Other"
          value="Other"
          name="Gender"
          id="formHorizontalRadios3"
          onChange={onChangeGender}
        />
        </div>
        </Form.Group>

        <Form.Group className="register-form-group">
          <Form.Label className ="registerForm-label">Date of birth</Form.Label>
          <Form.Control type="date" onChange={onChangeDateOfBirth}  required/>
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