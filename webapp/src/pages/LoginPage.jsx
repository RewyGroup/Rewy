import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import LoginForm from '../components/Login/LoginForm';

function LoginPage(props) {

    const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");

    useEffect(() =>{

        if(isLoggedIn){ 
            props.history.push("/");  
        }
    },[isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps


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