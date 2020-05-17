import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {createAnswer} from '../../actions/answer';
import {Editor, EditorState,convertToRaw} from 'draft-js';


import "./AnswerForm.css";


const AnswerForm = (props) => {

  const {question,token} = props;
  
  const [userId, setUserId] = useState(null);
  const [questionId,setQuestionId] = useState(null);
  const [text, setText] = useState("");
  const [editorState,setEditorState] = useState(EditorState.createEmpty(),)
  const id = useSelector(state => state.loginReducer.user.id);

  useEffect(() =>{
    setUserId(id)
    setQuestionId(question.id);

},[]);

useEffect(() => {
  const raw =  convertToRaw(editorState.getCurrentContent())
  const rawString = JSON.stringify(raw);
  var res  = rawString.replace(/"/g, "\"")
  setText(res);
}, [editorState]);

  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createAnswer(answerWeb,token));
    window.location.reload();

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
            <div className="textEditorWrapper">
                    <div className ="textEditor">
                <Editor placeholder=" " editorState={editorState} onChange={setEditorState} /> 
                </div>
                </div>
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
