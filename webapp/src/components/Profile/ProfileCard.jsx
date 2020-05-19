import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faEnvelope,faMapMarkerAlt,faVenusMars } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar-edit';
import './ProfileCard.css';
import ProfileImageModal from'./ProfileImageModal';
import {defaultImage} from '../../utils/DefaultImage';
import { uploadProfileImage,updateProfileImageUrlByUserId } from '../../actions/user';
import ProfileEditModal from './ProfileEditModal';

const ProfileCard = (props) => {

  const {user,token} = props;

  const imageUrl = useSelector(state => state.userReducer.imageUrl);

  const [preview,setPreview] = useState(defaultImage);
  const [imageSrc,setImageSrc] = useState(null);
  const [changeProfileImage,setChangeProfileImage] = useState(false);
  const [showImageModal,setShowImageModal] = useState(false);
  const [baseName,setBaseName]= useState(null)
  const [croppedImage,setCroppedImage] = useState(null);
  const [showEditModal,setShowEditModal] = useState(false);

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
      setImageSrc(null);
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
    handleShowImageModal();
    setChangeProfileImage(true);
    
  }
  const handleShowImageModal = () => setShowImageModal(true);

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    onClose(false);
  } 

  const handleUpdateImageModal = () => {
    setShowImageModal(false);
    onClose(true);
  } 

  



  const handleShowEditModal = () => setShowEditModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleUpdateEditModal = () =>{
    setShowEditModal(false);

  } 



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
                icon={faEdit} onClick={handleShowEditModal}
              />
            </div>
          </Card.ImgOverlay>

        </Card>

        <Card className="profileCardInfo">
        

          <Card.Body>
            <Row>
            <Col md={4} className="profileInfoLeft">
            <img className="profileImage" src={preview} onClick={profileImgClick} alt="Preview" />
            <div className="profileInfoHeader">
            <Card.Text className="profileFullname"><span>{user.firstName}</span><span>{user.lastName}</span></Card.Text>
            <Card.Text className="profileUsername"><span>@</span><span>{user.username}</span></Card.Text>
            </div>
            </Col>
            <Col md={8} className="profileInfoRight">
            <Card.Text>{user.email}<FontAwesomeIcon className="profileInfoIcon"
                icon={faEnvelope} 
              /></Card.Text>
            <Card.Text>{user.occupation}<FontAwesomeIcon className="profileInfoIcon"
                icon={faMapMarkerAlt} 
              /></Card.Text>
                          <Card.Text>{user.gender}<FontAwesomeIcon className="profileInfoIcon"
                icon={faVenusMars} 
              /></Card.Text>
            </Col>
            </Row>
          </Card.Body>
        </Card>
        <ProfileImageModal show={showImageModal} handleUpdate={handleUpdateImageModal} handleClose={handleCloseImageModal} showAvatar={showAvatar()}/>
        <ProfileEditModal token={token} show={showEditModal} handleUpdate={handleUpdateEditModal} handleClose={handleCloseEditModal} user={user}/>
         </div>
      </Col>
    </Row>
  );
};

export default ProfileCard;
