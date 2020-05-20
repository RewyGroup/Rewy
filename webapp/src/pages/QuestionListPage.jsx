import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {getAllQuestions,getAllQuestionsByCategoryName} from '../actions/question';
import {Cookies} from 'react-cookie';
import {Container} from 'react-bootstrap';
import QuestionCard from '../components/Question/QuestionCard';
import SuccessToast from '../utils/SuccessToast';

const QuestionListPage = (props) => {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const questionlist = useSelector(state => state.questionReducer.questionList);
    const {showSuccessToast,message} = props.location;
    var parts = props.location.pathname.split('/');
    const location = parts[parts.length - 1];

    
    useEffect(() => {
        if(!questionlist.length > 0){    
            
        if(location === "all"){
            
            dispatch(getAllQuestions());
        }else{
            dispatch(getAllQuestionsByCategoryName(location));
        }
    }
    }, [])

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

    const questions = questionlist && questionlist.length > 0 &&  
    questionlist.map((question,index)=>(<QuestionCard key={index} question={question} history={props.history}/>)) 
    

        return (
<Container>
<SuccessToast message={message} showSuccessToast={showSuccessToast}/>
{questions}
</Container>
        );
}

export default QuestionListPage;