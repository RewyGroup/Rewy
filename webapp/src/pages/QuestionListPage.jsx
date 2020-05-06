import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {getAllQuestions,getAllQuestionsByCategoryName} from '../actions/question';
import {Cookies} from 'react-cookie';
import {Container} from 'react-bootstrap';
import QuestionCard from '../components/Question/QuestionCard';
import QuestionSuccessToast from '../components/Question/QuestionSuccessToast';

const QuestionListPage = (props) => {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const questionlist = useSelector(state => state.questionReducer.questionList);
    const {showSuccessToast} = props.location;
    var parts = props.location.pathname.split('/');
    const location = parts[parts.length - 1];   
    
    useEffect(() => {
        if(location === "all"){
            dispatch(getAllQuestions(session_token));
        }else{
            dispatch(getAllQuestionsByCategoryName(location,session_token));
        }
    }, [])

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

    const questions = questionlist && questionlist.length > 0 &&  
    questionlist.map((question,index)=>(<QuestionCard key={index} question={question} history={props.history}/>)) 
    

        return (
<Container>
<QuestionSuccessToast showSuccessToast={showSuccessToast}/>
{questions}
</Container>
        );
}

export default QuestionListPage;