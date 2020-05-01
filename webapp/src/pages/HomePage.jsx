import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import CategoryList from '../components/Category/CategoryList';
import {Button} from 'react-bootstrap';

function HomePage(props) {

    const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }


    const createQuestion = () => {
        props.history.push("/question/create");
      }  

        return (
            <div >
                <CategoryList/>      
                <div style={{textAlign:"center"}}>
                {isLoggedIn ?<Button onClick={createQuestion}>Create Questions</Button>:""}
                </div>
            </div>
        );
}

export default HomePage;