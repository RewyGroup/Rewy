import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import RegisterForm from '../components/Register/RegisterForm';

function RegisterPage(props) {

    const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
    const dispatch = useDispatch();
    const isRegistered = useSelector(state => state.registerReducer.isRegistered);
    const cookies = new Cookies();
    const session_token = cookies.get("session_token");

    useEffect(() =>{

        if(isLoggedIn){ 
            props.history.push("/");  
        }
        
    },[isLoggedIn]);


    useEffect(()=>{
        if(isRegistered){
            props.history.push("/login")
        }
    })

    if(session_token){
        dispatch(stillLoggedIn(session_token));
      
    }

        return (
            <div>
                <RegisterForm/>
            </div>
        );
}

export default RegisterPage;