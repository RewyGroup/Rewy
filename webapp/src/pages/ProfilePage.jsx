import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import {Container} from 'react-bootstrap';
import {getUserById} from '../actions/user';
import ProfileCard from '../components/Profile/ProfileCard';
import CategoryForm from '../components/Category/CategoryForm'

function ProfilePage(props) {

    const dispatch = useDispatch();

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const userId = useSelector(state => state.loginReducer.user.id);
    const optionalUser = useSelector(state => state.userReducer.user);
    
    const user = optionalUser && optionalUser.id && <ProfileCard user={optionalUser}/>;
    
    
    useEffect(()=>{
       if(userId !== undefined){
        dispatch(getUserById(userId));
        }
        },[userId]);

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

        return (
            <div>
                <Container>
                {user}
                <CategoryForm/>
                </Container>
            </div>
        );
}

export default ProfilePage;