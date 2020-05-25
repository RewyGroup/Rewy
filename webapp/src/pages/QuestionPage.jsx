import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Container} from 'react-bootstrap'
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import { getQuestionById } from '../actions/question';
import Question from '../components/Question/Question'

const QuestionPage = (props) => {

  const {question} = props.history.location;

  
  
    const dispatch = useDispatch();
    var parts = props.location.pathname.split('/');
    const id = parts[parts.length - 1];   
    const [checker,setChecker] = useState(true);
    const [activeQuestion,setActiveQuestion] = useState(null);
    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const newQuestion = useSelector(state => state.questionReducer.question); 
    const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
    const questionLoaded = useSelector((state) => state.questionReducer.questionLoaded);

    if(checker){
        if (session_token) {
          dispatch(stillLoggedIn(session_token));
        }
        setChecker(false)
      }


    useEffect(() => {
        if(questionLoaded){  
          setActiveQuestion(question); 
        }else{
          dispatch(getQuestionById(id,session_token));  
        }
        }, [])

        useEffect(() => {

          if(activeQuestion === null && newQuestion && newQuestion.category){
              
            setActiveQuestion(newQuestion);
            }
          }, [newQuestion])
          

        const selectedQuestion = activeQuestion &&  activeQuestion.category && <Question history={props.history} isLoggedIn={isLoggedIn} token={session_token} question={activeQuestion}></Question>
        

        return (<Container>{selectedQuestion} </Container> );
}

export default QuestionPage;