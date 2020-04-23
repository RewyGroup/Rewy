import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signout,stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import LoginForm from '../components/Login/LoginForm';

function LoginPage(props) {

    const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");

    useEffect(() =>{

        if(isLoggedIn){
            console.log("welcome");    
            props.history.push("/");  
        }
        
    },[isLoggedIn]);


    if(session_token){
        dispatch(stillLoggedIn(session_token));
      
    }

        return (
            <div>
                <LoginForm/>
            </div>
        );
}

export default LoginPage;