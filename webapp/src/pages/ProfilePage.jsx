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

    const[showImageSuccessToast, setShowImageSuccessToast] = useState(false);
    const[showInfoSuccessToast, setShowInfoSuccessToast] = useState(false);

    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const userId = useSelector(state => state.loginReducer.user.id);
    const optionalUser = useSelector(state => state.userReducer.user);
    const updatedImage = useSelector(state => state.userReducer.updatedImage);
    const updatedProfile = useSelector(state => state.userReducer.updatedProfile);

    const profileImageMessage = "Profile image successfully changed!"
    const profileInfoMessage = "Profile successfully updated!"
    
    const user = optionalUser && optionalUser.id && <ProfileCard token={session_token} user={optionalUser}  history={props.history}/>;
    const ImageSuccessToast = showImageSuccessToast && <SuccessToast message={profileImageMessage} showSuccessToast={showImageSuccessToast} />
    const InfoSuccessToast = showInfoSuccessToast && <SuccessToast message={profileInfoMessage} showSuccessToast={showInfoSuccessToast} />
    
    
    useEffect(()=>{
       if(userId !== undefined){
        dispatch(getUserById(userId));
        }
    },[userId]);

    useEffect(()=>{
        if(updatedImage){
            dispatch(getUserById(userId));
            setShowImageSuccessToast(true)
        }else{
            setTimeout( () => {  
                setShowImageSuccessToast(false); 
            }, 5000);
        }


     },[updatedImage]);


     useEffect(()=>{
        if(updatedProfile){
            dispatch(getUserById(userId));
            setShowInfoSuccessToast(true)
        }else{
            setTimeout( () => {  
                setShowInfoSuccessToast(false); 
            }, 5000);
        }


     },[updatedProfile]);
 

    if(session_token){
        dispatch(stillLoggedIn(session_token));
    }

        return (
            <div>
                <Container>
                {ImageSuccessToast}
                {InfoSuccessToast}
                {user}
                </Container>
            </div>
        );
}

export default ProfilePage;