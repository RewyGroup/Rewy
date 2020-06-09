import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {getAllQuestions,getAllQuestionsByCategoryName} from '../actions/question';
import {Cookies} from 'react-cookie';
import {Col,Row} from 'react-bootstrap';
import QuestionCard from '../components/Question/QuestionCard';
import SuccessToast from '../utils/SuccessToast';
import Sidebar from '../utils/Sidebar';

const QuestionListPage = (props) => {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const questionlist = useSelector(state => state.questionReducer.questionList);
    const selectedCategory = useSelector(state => state.categoryReducer.selectedCategory);
    const {showSuccessToast,message} = props.location;
    var parts = props.location.pathname.split('/');
    const location = parts[parts.length - 1];

    
    useEffect(() => {
        if(questionlist.length === 0){    
            
            if(location === "all"){
                dispatch(getAllQuestions());
            }

            else if(selectedCategory === "" || selectedCategory === location){
                dispatch(getAllQuestionsByCategoryName(location))
            }

        }else{
            if(selectedCategory === location){
                window.location.reload();
                dispatch(getAllQuestionsByCategoryName(location))
            }
        }
    }, [])
    

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

    const questions = questionlist && questionlist.length > 0 &&
    questionlist.map((question,index)=>(<QuestionCard key={index} question={question} history={props.history}/>)) 
    
    
        return (<div>
<SuccessToast message={message} showSuccessToast={showSuccessToast}/>
    <Row className="m-0">
    <Col className="sidebarWrapper" xs={12} lg={2}>
        <Sidebar active={"EXPLORE"}/>
    </Col>
    <Col xs={{span:10, offset:1}} lg={{span:7, offset:1}}>
{questions}
</Col>
</Row>
</div>
        );
}

export default QuestionListPage;