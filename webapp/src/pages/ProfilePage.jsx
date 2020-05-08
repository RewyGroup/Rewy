import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import {Container} from 'react-bootstrap';
import ProfileCard from '../components/Profile/ProfileCard';

function ProfilePage(props) {

    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");


    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

        return (
            <div>
                <Container>
                <ProfileCard/>
                </Container>
            </div>
        );
}

export default ProfilePage;