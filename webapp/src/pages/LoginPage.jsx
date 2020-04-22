import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { signout, checkLoggedIn,stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import jwt_decode from 'jwt-decode';


function LoginPage() {

    const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);
    const user = {username: "johnnyh97", password: "johnnyh"};
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }
    
    
    

    
        return (
            <div>
                {isLoggedIn ? <button onClick={() => dispatch(signout())}>sign out</button> : <button onClick={() => dispatch(checkLoggedIn(user))}>sign in</button>}
                {isLoggedIn ?  <h1>you are logged in</h1> : ""}
              
            </div>
        );
}

export default LoginPage;