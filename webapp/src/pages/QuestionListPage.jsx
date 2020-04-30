import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {getAllQuestions} from '../actions/question';
import {Cookies} from 'react-cookie';
import {Card,Button,Container,Row} from 'react-bootstrap';
import QuestionCard from '../components/Question/QuestionCard';

const QuestionListPage = (props) => {

    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const questionlist = useSelector(state => state.questionReducer.questionList);

    useEffect(() => {
    
    dispatch(getAllQuestions(session_token));
         
    }, [])

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

    const questions = questionlist && questionlist.length > 0 &&  
    questionlist.map((question)=>(<QuestionCard question={question}/>)) 
    

        return (
<Container>
{questions}
</Container>
        );
}

export default QuestionListPage;