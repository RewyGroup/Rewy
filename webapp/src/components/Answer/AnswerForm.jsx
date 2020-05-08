import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {createAnswer} from '../../actions/answer';

import "./AnswerForm.css";


const AnswerForm = (props) => {

  const {question,token} = props;
  
  const [userId, setUserId] = useState(null);
  const [questionId,setQuestionId] = useState(null);
  const [text, setText] = useState("");

  const id = useSelector(state => state.loginReducer.user.id);

  useEffect(() =>{
    setUserId(id)
    setQuestionId(question.id);

},[]);

  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createAnswer(answerWeb,token));
    window.location.reload();

  };

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  const answerWeb = {
    userId: userId,
    questionId: questionId,
    text: text,
  };


  
  
  return (

        <Form className="answerForm" onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea2">
            <Form.Label>Answer the Question</Form.Label>
            <Form.Control placeholder="describe..." as="textarea" rows="10" onChange={onChangeText} />
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
