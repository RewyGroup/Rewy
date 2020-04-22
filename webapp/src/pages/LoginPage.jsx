import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signout, checkLoggedIn,stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import LoginForm from '../components/Login/LoginForm';

function LoginPage() {

    const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

    if(isLoggedIn){
     
    }
        return (
            <div>
                <LoginForm/>
               {isLoggedIn ?<div> <button onClick={() => dispatch(signout())}>sign out</button><h1>you are logged in</h1></div>:""}
            </div>
        );
}

export default LoginPage;