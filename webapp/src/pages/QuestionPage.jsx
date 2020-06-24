import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap'
import { stillLoggedIn } from '../actions/login';
import { Cookies } from 'react-cookie';
import { getQuestionById,setQuestion } from '../actions/question';
import Question from '../components/Question/Question'
import Sidebar from '../utils/Sidebar';
import { withRouter } from "react-router-dom";

const QuestionPage = (props) => {

  const { question } = props.history.location;

  const dispatch = useDispatch();
  var parts = props.location.pathname.split('/');
  const id = parts[parts.length - 1];
  const [checker, setChecker] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const cookies = new Cookies();
  const session_token = cookies.get("session_token");
  const newQuestion = useSelector(state => state.questionReducer.question);
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  const questionLoaded = useSelector((state) => state.questionReducer.questionLoaded);

  if (checker) {
    if (session_token) {
      dispatch(stillLoggedIn(session_token));
    }
    setChecker(false)
  }



  useEffect(() => {
    if (questionLoaded) {
      if(question){
        setActiveQuestion(question);
      }
      else{
        dispatch(getQuestionById(id, session_token));
      }
    }
     else {
      dispatch(getQuestionById(id, session_token));
    }

  }, []);


  useEffect(() => {
    if (!activeQuestion && !question && newQuestion && newQuestion.category) {

      setActiveQuestion(newQuestion);
    }
  }, [newQuestion]);



  useEffect(() => {
    if(activeQuestion){
    dispatch(setQuestion(activeQuestion));
    }
  }, [activeQuestion]);


  const selectedQuestion = activeQuestion && activeQuestion.category && <Question history={props.history} isLoggedIn={isLoggedIn} token={session_token} question={activeQuestion}></Question>

  return (
    <div>
      <Row className="m-0">
        <Col className="sidebarWrapper" xs={12} lg={2}>
          <Sidebar active={"EXPLORE"} />
        </Col>
        <Col xs={12} lg={10}>
          <Container>
            {selectedQuestion}
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(QuestionPage);