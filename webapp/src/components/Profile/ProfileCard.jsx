import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Avatar from 'react-avatar-edit';
import "./ProfileCard.css";

const ProfileCard = (props) => {

  const {user} = props;
  const dispatch = useDispatch();

  const [preview,setPreview] = useState(null);
  const [imageSrc,setImageSrc] = useState("/logo.jpg");
  const [changeProfileImage,setChangeProfileImage] = useState(false);

  function onClose() {
  }
  
  function onCrop(preview) {
    setPreview({preview});
  }

  function onBeforeFileLoad(elem) {
    if(elem.target.files[0].size > 71680){
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  const profileImgClick =(event) =>{
    console.log("hello");
    setChangeProfileImage(true);
    
  }


  return (
    <Row className="profileCardRow">
      <Col xs={6} md={12}>
        <div className="profileCardWrapper">
        <Card className="profileCardBanner">
          <Card.Img className="profileCardImg" src="/banner.jpg" alt="Card image" />
          <Card.ImgOverlay className="profileImgOverlay">
            <div className="profileCardEditButtonWrapper">
              <FontAwesomeIcon
                className="profileCardEditButton"
                icon={faEdit}
              />
            </div>
          </Card.ImgOverlay>

        </Card>

        <Card className="profileCardInfo">
        {preview ? 
           <img className="profileImage" src={preview.preview} alt="Preview"/>
         :<img className="profileImage" src={imageSrc} alt="Preview" />}
          <Card.Body>
            <div className="profileInfoHeader">
            <Card.Title>firstname</Card.Title>
            </div>
            <Card.Text>{user.firstName}</Card.Text>
            <Card.Title>lastname</Card.Title>
            <Card.Text>{user.lastName}</Card.Text>
            <Card.Title>mail</Card.Title>
            <Card.Text>{user.email}</Card.Text>
            <Avatar width={200} height={200} 
         onCrop={onCrop} onClose={onClose}
         onBeforeFileLoad={onBeforeFileLoad} src={imageSrc}/>
          </Card.Body>
        </Card>
         </div>
      </Col>
    </Row>
  );
};

export default ProfileCard;
