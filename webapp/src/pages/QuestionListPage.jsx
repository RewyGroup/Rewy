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

    useEffect(() => {
    
    dispatch(getAllQuestions());
         
    }, [])


    const QuestionList = useSelector(state => state.questionReducer.QuestionList);


    // function questionCard(list){

    //     for(var i = 0; i < list.length; i ++){
    //            {<QuestionCard question={question[i]}/>
    //     }
    // }


    

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

        return (
<Container>
    
    <QuestionCard/>
    <QuestionCard/>
    <QuestionCard/>
    <QuestionCard/>
    <QuestionCard/>

</Container>
        );
}

export default QuestionListPage;