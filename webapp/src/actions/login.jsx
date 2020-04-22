import {Cookies} from 'react-cookie';
import api from '../api/api';

const cookies = new Cookies();

export const checkLoggedIn = (user) => {
    return (dispatch) => {
        
        return api.signIn(user).then(response => {
            cookies.set("session_token",response.data.jwt);
            dispatch(signin(response.data.jwt))
        })
        .catch(error =>{
            dispatch({
                type: 'SIGN_IN_ERROR',error:error
            })
            throw(error);
        })
    }
}

const signin = (token) =>{

        return{
        type: 'SIGN_IN',
        payload: token
        
    }
};

export const signout =() =>{
    cookies.remove("session_token");
    return{
        type: 'SIGN_OUT'
    }
};


export const stillLoggedIn =(session_token) =>{

    return{
        type: 'STILL_LOGGED_IN',
        payload: session_token
    }
};