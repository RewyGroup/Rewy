import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import {getAllCategories} from '../actions/category'
import QuestionForm from '../components/Question/QuestionForm';


const CreateQuestionPage = (props) => {

    const [checker,setChecker] = useState(true);
    const [userId,setUserId] = useState(null);
    
    const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const questionIsCreated = useSelector(state => state.questionReducer.questionIsCreated);
    const id = useSelector((state) => state.loginReducer.user.id);

    useEffect(() => {
        if (!isLoggedIn) {
          props.history.push("/login");
        }
      
        setUserId(id);
        dispatch(getAllCategories());
      }, []);
    
  

    if(checker){
        if (session_token) {
          dispatch(stillLoggedIn(session_token));
        }
        setChecker(false)
      }
  
  

  
  
    useEffect(() => {
      if(questionIsCreated){
        props.history.push({pathname: '/question/all', showSuccessToast: true});
      }
    },[questionIsCreated]);



        return (
            <div >
            <QuestionForm userId={userId} token={session_token}/>
            </div>
        );
}

export default CreateQuestionPage;