import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import QuestionForm from '../components/Question/QuestionForm';

const QuestionPage = (props) => {

    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");

    QuestionList = useSelector(state => state.QuestionList);

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }


        return (
    <div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
    </div>
    </div>
        );
}

export default QuestionPage;