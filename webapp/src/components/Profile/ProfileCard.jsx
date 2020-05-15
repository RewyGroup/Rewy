import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Avatar from 'react-avatar-edit';
import "./ProfileCard.css";
import ProfileModal from "./ProfileModal";
import {defaultImage} from "../../utils/DefaultImage";

const ProfileCard = (props) => {

  const {user} = props;

  const [preview,setPreview] = useState(null);
  const [text,setText] = useState(defaultImage);
  const [imageSrc,setImageSrc] = useState("/logo.jpg");
  const [changeProfileImage,setChangeProfileImage] = useState(false);
  const [show,setShow] = useState(false);

  function onClose() {
    setChangeProfileImage(false);
  }
  
  function onCrop(preview) {
    setText(preview);
  }

  function onBeforeFileLoad(elem) {
    if(elem.target.files[0].size > 71680){
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  const showAvatar = () =>{
  
    if(changeProfileImage){
      return(
      <Avatar width={300} height={300} 
      onCrop={onCrop} onClose={onClose}
      onBeforeFileLoad={onBeforeFileLoad} src={imageSrc}/>
      )
    };
  }

  const profileImgClick =(event) =>{
    handleShow();
    setChangeProfileImage(true);
    
  }

  const handleClose = () => {
    setShow(false);
    onClose();
  } 
  const handleShow = () => setShow(true);


  useEffect(() =>{
    var fd = new FormData()
    if(text){
      console.log(preview);

      var url = text;

      fetch(url)
      .then(res => res.blob())
      .then(blob => {

        fd.append('image', blob, 'filename')    

        console.log(blob);
          // Upload
          // fetch('upload', {method: 'POST', body: fd})
      })
     
    }
},[text]);

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
        <img className="profileImage" src={text} onClick={profileImgClick} alt="Preview" />
          <Card.Body>
            <div className="profileInfoHeader">
            <Card.Title>firstname</Card.Title>
            </div>
            <Card.Text>{user.firstName}</Card.Text>
            <Card.Title>lastname</Card.Title>
            <Card.Text>{user.lastName}</Card.Text>
            <Card.Title>mail</Card.Title>
            <Card.Text>{user.email}</Card.Text>
          </Card.Body>
        </Card>
        <ProfileModal show={show} handleClose={handleClose} handleShow={handleShow} showAvatar={showAvatar()}/>
         </div>
      </Col>
    </Row>
  );
};

export default ProfileCard;
