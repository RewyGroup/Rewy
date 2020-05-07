import React, { useState, useEffect } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Cookies} from 'react-cookie';



const AnswerForm = (props) => {

  const [userId, setUserId] = useState(4);
  const [questionId,setQuestionId] = useState(49)
  const [text, setText] = useState("");

  const cookies = new Cookies();
  const session_token = cookies.get("session_token");
  
console.log(session_token);

  const answerWeb = {
    userId: userId,
    questionId: questionId,
    text: text,
  };

  const dispatch = useDispatch;


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createQuestion(answerWeb, session_token));
  };
  
  
  return (

        <Form className="questionForm" onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Answer the Question</Form.Label>
            <Form.Control placeholder="describe..." as="textarea" rows="10" />
          </Form.Group>
          <Form.Group>
            <Button variant="dark" type="submit">
              Submit Answer
            </Button>
         </Form.Group>
        </Form>
  );
};

export default AnswerForm;
