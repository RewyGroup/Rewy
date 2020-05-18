import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar-edit';
import './ProfileCard.css';
import ProfileModal from'./ProfileModal';
import {defaultImage} from '../../utils/DefaultImage';
import { uploadProfileImage,updateProfileImageUrlByUserId } from '../../actions/user';

const ProfileCard = (props) => {

  const {user,token} = props;

  const imageUrl = useSelector(state => state.userReducer.imageUrl);

  const [preview,setPreview] = useState(defaultImage);
  const [imageSrc,setImageSrc] = useState(null);
  const [changeProfileImage,setChangeProfileImage] = useState(false);
  const [show,setShow] = useState(false);
  const [baseName,setBaseName]= useState(null)
  const [croppedImage,setCroppedImage] = useState(null);


  const dispatch = useDispatch();

  function onClose(saveImage) {
    if(saveImage){
      const formdata = new FormData();
      formdata.append("multipartFile", croppedImage);
      dispatch(uploadProfileImage(formdata,token));
      
    }else if(user.profileImageUrl){
      setPreview(user.profileImageUrl)
    }else{
    setPreview(defaultImage)
    }
  }
  
  function onCrop(image) {
    setPreview(image);
  }


  function onBeforeFileLoad(elem) {
    setBaseName(elem.target.files[0].name);
    setImageSrc(URL.createObjectURL(elem.target.files[0]));
    if(elem.target.files[0].size > 100680){
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  const showAvatar = () =>{
  
    if(changeProfileImage){
      return(
      <Avatar width={300} height={300} 
      onCrop={onCrop} onClose={onClose}
      label={"Choose an image"}
      onBeforeFileLoad={onBeforeFileLoad} src={imageSrc}/>
      )
    };
  }

  const profileImgClick =() =>{
    handleShow();
    setChangeProfileImage(true);
    
  }

  const handleClose = () => {
    setShow(false);
    onClose(false);
  } 

  const handleUpdate = () => {
    setShow(false);
    onClose(true);
  } 

  const handleShow = () => setShow(true);


  useEffect(() =>{
    if(baseName){
      if(preview){

        var url = preview;

        fetch(url)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], baseName,{ type: "image/png" })
          setCroppedImage(file)  
        })
        
      }
    }
    },[preview]);


    useEffect(() =>{
      
      if(imageUrl){  
        dispatch(updateProfileImageUrlByUserId(user.id,imageUrl,token))
      }
      },[imageUrl]);


    useEffect(() =>{

      if(user.profileImageUrl){
        setPreview(user.profileImageUrl);
        
      }
      
      },[]);
  




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
        <img className="profileImage" src={preview} onClick={profileImgClick} alt="Preview" />

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
        <ProfileModal show={show} handleUpdate={handleUpdate} handleClose={handleClose} handleShow={handleShow} showAvatar={showAvatar()}/>
         </div>
      </Col>
    </Row>
  );
};

export default ProfileCard;
