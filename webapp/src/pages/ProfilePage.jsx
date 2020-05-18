import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import {Container} from 'react-bootstrap';
import {getUserById} from '../actions/user';
import ProfileCard from '../components/Profile/ProfileCard';
import SuccessToast from '../utils/SuccessToast';


function ProfilePage(props) {

    const dispatch = useDispatch();

    const[showSuccessToast, setShowSuccessToast] = useState(false);

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const userId = useSelector(state => state.loginReducer.user.id);
    const optionalUser = useSelector(state => state.userReducer.user);
    const updatedImage = useSelector(state => state.userReducer.updatedImage);
    const message = "Profile image successfully changed!"
    
    const user = optionalUser && optionalUser.id && <ProfileCard token={session_token} user={optionalUser}/>;
    const successToast = showSuccessToast && <SuccessToast message={message} showSuccessToast={showSuccessToast} />
   
    
    
    useEffect(()=>{
       if(userId !== undefined){
        dispatch(getUserById(userId));
        }
    },[userId]);

    useEffect(()=>{
        if(updatedImage){
            dispatch(getUserById(userId));
            setShowSuccessToast(true)
        }else{
            setTimeout( () => {  
                setShowSuccessToast(false); 
            }, 5000);
        }


     },[updatedImage]);
 

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

        return (
            <div>
                <Container>
                {successToast}
                {user}
                </Container>
            </div>
        );
}

export default ProfilePage;