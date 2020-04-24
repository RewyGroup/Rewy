import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import CategoryList from '../components/Category/CategoryList';

function HomePage(props) {

    const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");


    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

        return (
            <div >
                <div style={{textAlign:"center"}}>
                {isLoggedIn ?<h1>you are logged in</h1>:""}

                </div>
                <CategoryList/>      
            </div>
        );
}

export default HomePage;