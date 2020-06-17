import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Cookies} from 'react-cookie';
import 'react-multi-carousel/lib/styles.css';
import {getAllUsers} from '../actions/user';
import {stillLoggedIn} from '../actions/login';
import {Row,Col, Container} from 'react-bootstrap';
import Sidebar from '../utils/Sidebar';
import UserCard from '../components/User/UserCard';

function UsersPage(props) {
    const {history} = props
    const users = useSelector(state => state.userReducer.users);
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }


    useEffect(() =>{

       dispatch(getAllUsers());
        
    },[]);

    useEffect(() =>{

        
         
     },[users]);

     const usersList = users.length > 0 &&
     users.map((user,index) => (
       <UserCard key={index} user={user} history={history}/>    

     ));

        return (
            <Row className="m-0">
            <Col className="sidebarWrapper" xs={12} lg={2}>
                <Sidebar active={"USERS"}/>
            </Col>
                <Col xs={12} lg={10} className="usersCards">
                    <Container>
                    <Row className="m-0">
                {usersList}
                    </Row>
                    </Container>
                </Col>
    
                </Row>
        );
}

export default UsersPage;