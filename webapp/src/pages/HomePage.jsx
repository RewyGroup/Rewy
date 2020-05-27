import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import CategoryList from '../components/Home/Category/CategoryList';
import {Container} from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import Landing from '../components/Home/Landing/Landing';
import Information from '../components/Home/Information/Information';
import FooterCard from '../components/Home/Footer/FooterCard';
import Footer from '../components/Home/Footer/Footer';

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
                <Landing/>
                    <Information createQuestion={createQuestion}/>
                <CategoryList history={props.history}/> 
                <FooterCard/>     
                </Container>
                <Footer/>   
        
            </div>
        );
}

export default HomePage;