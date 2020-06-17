import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {stillLoggedIn} from '../actions/login';
import {Cookies} from 'react-cookie';
import {Container,Col,Row} from 'react-bootstrap';
import {getUserById} from '../actions/user';
import ProfileCard from '../components/Profile/ProfileCard';
import SuccessToast from '../utils/SuccessToast';
import {getUserByUsername} from '../actions/user'
import Sidebar from '../utils/Sidebar';


function ProfilePage(props) {
    const {history} = props
    const dispatch = useDispatch();
    

    const[showImageSuccessToast, setShowImageSuccessToast] = useState(false);
    const[showInfoSuccessToast, setShowInfoSuccessToast] = useState(false);
    const [selectedUser,setSelectedUser] = useState({});

    
    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const userId = useSelector(state => state.loginReducer.user.id);
    const optionalUser = useSelector(state => state.userReducer.user);
    const updatedImage = useSelector(state => state.userReducer.updatedImage);
    const updatedProfile = useSelector(state => state.userReducer.updatedProfile);
    const [isLoggedInUser,setIsLoggedInUser] = useState(false);
    
    const username = props.location.pathname.split('/')[2];

    const profileImageMessage = "Profile image successfully changed!"
    const profileInfoMessage = "Profile successfully updated!"
    
    const user = selectedUser && selectedUser.id && <ProfileCard token={session_token} user={selectedUser} history={props.history} isLoggedInUser={isLoggedInUser}/>;
    const ImageSuccessToast = showImageSuccessToast && <SuccessToast message={profileImageMessage} showSuccessToast={showImageSuccessToast} />
    const InfoSuccessToast = showInfoSuccessToast && <SuccessToast message={profileInfoMessage} showSuccessToast={showInfoSuccessToast} />
    
    

    useEffect(()=>{

        
        if(history.location.user){
            setSelectedUser(history.location.user)   
        }
        else{
            dispatch(getUserByUsername(username));
        }
    
     },[]);

     useEffect(()=>{

    if(optionalUser.id){
        setSelectedUser(optionalUser);
    }
     },[optionalUser]);


     useEffect(()=>{
        
        if(selectedUser.id === userId){
            setIsLoggedInUser(true);
        }

         },[selectedUser]);



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
            {ImageSuccessToast}
            {InfoSuccessToast}
            <Row className="m-0">
            <Col className="sidebarWrapper" xs={12} lg={2}>
                <Sidebar active={"USERS"}/>
            </Col>
                <Col xs={12} lg={10}>
                <Container>
                    <Row className="m-0">

                    {user}
                    </Row>
                    </Container>
                </Col>
    
                </Row>
            </div>
        );
}

export default ProfilePage;