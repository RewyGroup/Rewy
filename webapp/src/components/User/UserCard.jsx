import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Row,Col,Button} from 'react-bootstrap';
import "./UserCard.css";



function UserCard(props) {
    const {user,history} = props;

    const dispatch = useDispatch();


    useEffect(() =>{
        
    },[]);
    
    const handleOnClick = (e) => {
        e.preventDefault();
        const path = "/user/" + user.username;
        history.push({ pathname: path, user: user });
      };
    

        return (
                <Col xs={6} lg={4} xl={3} className="userCard">
                    <Col xs={12} className="userCardWrapper">
                        <img className="userCardImg" src={user.profileImageUrl} alt="profile" />
                        <div className="userCardNameWrapper">
                        <div className="userCardFullname">{user.firstName} {user.lastName}</div>
                        <div className="userCardUsername">@{user.username}</div>
                        </div>
                        <Row className="m-0">
                            <Col xs={6} ><div className="userCardStats">post</div><div className="userCardStatsNumber">55</div></Col>
                           
                            <Col xs={6}><div className="userCardStats">poäng</div><div className="userCardStatsNumber">309</div></Col>
                        </Row>
                        <div className="userCardButtonWrapper">
                        <Button className="userCardButton" onClick={handleOnClick}>visa profil</Button>
                        </div>
                    </Col>

                </Col>
        );
}

export default UserCard;