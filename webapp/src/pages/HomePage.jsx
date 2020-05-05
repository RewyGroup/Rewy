import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import CategoryList from '../components/Category/CategoryList';
import {Button, Container} from 'react-bootstrap';
import Description from '../components/Description/Description';

function HomePage(props) {

    const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }


    const createQuestion = () => {
        if(isLoggedIn){
        props.history.push("/question/create");
        }else{
            props.history.push("/login");
        }
      }  

        return (
            <div >
                <Container>
                    <Description createQuestion={createQuestion}/>
                <CategoryList/>      
                </Container>
            </div>
        );
}

export default HomePage;