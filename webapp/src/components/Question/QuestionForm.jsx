import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {stillLoggedIn} from '../../actions/login';
import {createQuestion} from '../../actions/question';
import {Cookies} from 'react-cookie';
import './QuestionForm.css';

const QuestionForm = (props) => {

  const [userId,setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category,setCategory] = useState("Mathematics");
  const [subCategory,setSubCategory] = useState(["Algebra","Addition"]);

  const dispatch = useDispatch();

  const cookies = new Cookies();
  const session_token = cookies.get("session_token");
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
  const id = useSelector(state => state.loginReducer.user.id);  

  
  if(session_token){
    dispatch(stillLoggedIn(session_token));
}

useEffect(() => {
    
    if(!isLoggedIn){
        props.history.push("/login");
    }  
    setUserId(id);
     
}, [])


useEffect(() => {

    if(!isLoggedIn){
        props.history.push("/login");
    }
    
}, [isLoggedIn])





  const questionWeb = {
    userId: userId,
    title: title,
    text: text,
    category: category,
    subCategory: subCategory,
  }

  const onChangeText = event => {
    setText(event.target.value);
  }

  const onChangeTitle = event => {
    setTitle(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(createQuestion(questionWeb,session_token));
  }  



  return (

<Container className="questionContainer">
    <Row className="questionRow">
    <Form className="questionForm" onSubmit={handleSubmit}>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Create question</Form.Label>
    <Form.Control type="text" placeholder="title" onChange={onChangeTitle} />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Example select</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>write your question</Form.Label>
    <Form.Control  as="textarea" rows="10" onChange={onChangeText} />
  </Form.Group>
  <Form.Group>
            <Button variant="dark" type="submit">
              Create
            </Button>
          </Form.Group>
</Form>
    </Row>
</Container>


  );
}

export default QuestionForm;