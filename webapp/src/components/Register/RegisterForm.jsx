import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import './RegisterForm.css';
import { register } from '../../actions/register';
import Footer from '../Home/Footer/Footer'

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
<div>
      <Row className="registerRow mr-0">
        <Col xs={12}  lg={{span:4, offset:1}} xl={5} >
          <div className="registerImgWrapper">
        <img className="registerImg" src="/registrera.png" alt="registrera" />
        </div>
        </Col>
        <Col className="registerFormPlacement" xs={12} lg={{span:6, offset:-1}} xl={5} >
        <Form className="registerForm" onSubmit={handleSubmit}>
          <div id="header">
            <h2>Registrera</h2>
          </div>
          <Form.Group className="register-form-group" controlId="formBasicUsername">

            <Form.Control placeholder="Användarnamn" className="registerForm-control" type="text" onChange={onChangeUsername} required />
          </Form.Group>

          <Form.Group className="register-form-group" controlId="formBasicPassword">

            <Form.Control placeholder="Lösenord" className="registerForm-control" type="password" onChange={onChangePassword}  required/>
          </Form.Group>

            <Form.Group className="register-form-group" controlId="formBasicEmail">

              <Form.Control placeholder="E-post" className="registerForm-control" type="email" onChange={onChangeEmail}  required/>
            </Form.Group>

            <Form.Group className="register-form-group" controlId="formBasicFirstName">

              <Form.Control placeholder="Förnamn" className="registerForm-control" type="text" onChange={onChangeFirstName}required />
            </Form.Group>

            <Form.Group className="register-form-group" controlId="formBasicLastName">

              <Form.Control placeholder="Efternamn" className="registerForm-control" type="text" onChange={onChangeLastName}required />
            </Form.Group>

            <Form.Group className="register-form-group" controlId="formBasicOccupation">

              <Form.Control placeholder="Sysselsättning" className="registerForm-control" type="text" onChange={onChangeOccupation}  required/>
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




            <Button className="registerButton" type="submit">
            REGISTRERA
            </Button>
            {errorMessage ? <div>{errorMessage}</div> : <div></div>}
        </Form>
        </Col>
      </Row>
</div>


  );
}

export default RegisterForm;