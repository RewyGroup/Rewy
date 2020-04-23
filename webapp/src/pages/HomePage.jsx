import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signout,stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';

function HomePage(props) {

    const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn);
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");


    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }else{
        props.history.push("/login");
    }

        return (
            <div>
                <h1>HomePage</h1>
               {isLoggedIn ?<div> <button onClick={() => dispatch(signout())}>sign out</button><h1>you are logged in</h1></div>:""}
            </div>
        );
}

export default HomePage;