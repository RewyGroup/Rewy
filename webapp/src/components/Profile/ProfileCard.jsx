import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Tabs,Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faEnvelope,faMapMarkerAlt,faVenusMars } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar-edit';
import './ProfileCard.css';
import ProfileImageModal from'./ProfileImageModal';
import { uploadProfileImage,updateProfileImageUrlByUserId,getAllQuestionsById} from '../../actions/user';
import ProfileEditModal from './ProfileEditModal';
import ProfileQuestionCard from './profileQuestionCard';



const ProfileCard = (props) => {

  const {user,token,history,isLoggedInUser} = props;

  const imageUrl = useSelector(state => state.userReducer.imageUrl);
  const questionList = useSelector(state => state.questionReducer.questionList);

  

  const [preview,setPreview] = useState(null);
  const [imageSrc,setImageSrc] = useState(null);
  const [changeProfileImage,setChangeProfileImage] = useState(false);
  const [showImageModal,setShowImageModal] = useState(false);
  const [baseName,setBaseName]= useState(null)
  const [croppedImage,setCroppedImage] = useState(null);
  const [showEditModal,setShowEditModal] = useState(false);
  const [userQuestions, setUserQuestions]=useState();
  const [counter,setCounter] = useState(0); 
  const[questionListIsLoading, setQuestionListIsLoading]=useState(true);
  const dispatch = useDispatch();


  useEffect(()=>{
    questionList.map((question) =>{
      var timeinmillis = Date.parse(question.createdAt);
      question.createdAt = timeinmillis;            
  });
    questionList.sort(function(a, b){ return b.createdAt - a.createdAt});
    const questions = questionList &&
    questionList.map((question,index) => (<ProfileQuestionCard key={index} question={question} history={history}/>));
    setUserQuestions(questions);
    setCounter(counter+1);
  }
  ,[questionList]);
  
  useEffect(()=>{
    if(counter ===2){
      setQuestionListIsLoading(false);
    }
  },[counter])


  function onClose(saveImage) {
    if(saveImage){
      const formdata = new FormData();
      formdata.append("multipartFile", croppedImage);
      dispatch(uploadProfileImage(formdata,token));
      
    }else if(user.profileImageUrl){
      setPreview(user.profileImageUrl)
    }else{
    setPreview(null)
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
        dispatch(getAllQuestionsById(user.id));
      },[]);
  




  return (

      <Row className="mr-0 ml-0 profileCard">
        <Col className="profileCardWrapper" xs={12}>
          <img  className="profileCardBanner" src="/banner.png" alt="banner" />
        </Col>
        <Col className="profileCardInfoWrapper" xs={12}>
        <img className="profileImage" src={preview} onClick={profileImgClick} alt="Preview" />
        <div className="profileCardInfoEditIcon">
        {isLoggedInUser ? <FontAwesomeIcon className="profileCardInfoEditIconSvg"
                icon={faEdit} onClick={handleShowEditModal}
              />:<div className="profileCardNoSvg"></div>}
              </div>
      <div className="profileCardInfoName">{user.firstName} {user.lastName}</div>
      <div className="profileCardInfoUsername">@{user.username}</div>
      </Col>
      <Col className="profileCardWrapper" xs={12}>
    <Tabs className="profileCardTabs" fill defaultActiveKey="info" id="uncontrolled-tab-example">
  
    <Tab  className="profileCardTab" eventKey="points" title="Poäng">

    </Tab>
    <Tab className="profileCardTab" eventKey="info" title="Information">
        <div className="profileCardInformation"><FontAwesomeIcon className="profileInfoIcon"
                icon={faEnvelope} 
              />{user.email}</div>
        <div className="profileCardInformation"><FontAwesomeIcon className="profileInfoIcon"
                icon={faMapMarkerAlt} 
              />{user.occupation}</div>
        <div className="profileCardInformation"><FontAwesomeIcon className="profileInfoIcon"
                icon={faVenusMars} 
              />{user.gender}</div>
    </Tab>
    <Tab className="profileCardTab" eventKey="questions" title={isLoggedInUser ? "Dina frågor" : user.username + "'s frågor"}>
      <div className="profileCardQuestionsWrapper">
      {questionListIsLoading ? "Loading": userQuestions}
      </div>
    </Tab>
  </Tabs>
  </Col>
{isLoggedInUser ? <ProfileImageModal show={showImageModal} handleUpdate={handleUpdateImageModal} handleClose={handleCloseImageModal} showAvatar={showAvatar()}/>:""}
  <ProfileEditModal token={token} show={showEditModal} handleUpdate={handleUpdateEditModal} handleClose={handleCloseEditModal} user={user}/>
  </Row>

  );
};

export default ProfileCard;
