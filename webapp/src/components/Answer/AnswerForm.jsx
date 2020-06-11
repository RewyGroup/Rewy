import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {createAnswer} from '../../actions/answer';
import {EditorState,convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../utils/TextEditor.css"

import "./AnswerForm.css";


const AnswerForm = (props) => {

  const {question,token} = props;
  
  const [userId, setUserId] = useState(null);
  const [questionId,setQuestionId] = useState(null);
  const [text, setText] = useState("");
  const [editorState,setEditorState] = useState(EditorState.createEmpty(),)
  const [editorFocused,setEditorFocused] = useState(false);
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


const onFocusEditor = (event) => {
  setEditorFocused(true);
};
const onblurEditor = (event) => {

  setEditorFocused(false);
  
}


  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createAnswer(answerWeb,token));

  };


  const answerWeb = {
    userId: userId,
    questionId: questionId,
    text: text,
  };


  
  
  return (

        <Form className="answerForm" onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea2">
            <Form.Label className="answerFormLabel">Skriv ditt svar</Form.Label>
  
                <Editor
            onFocus={onFocusEditor}
            onBlur={onblurEditor}
           editorState={editorState}
           toolbarClassName=""
         wrapperClassName="textEditorWrapper"
         editorClassName={editorFocused ? "textEditorActive" : "textEditor"}
           onEditorStateChange={setEditorState}
           />
          </Form.Group>
          <Form.Group className="answerFormSubmitButtonWrapper">
            <Button className="answerFormSubmitButton" type="submit">
              Svara
            </Button>
         </Form.Group>

        </Form>
  );
};

export default AnswerForm;
