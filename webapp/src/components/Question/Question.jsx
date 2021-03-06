import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./Question.css";
import { useSelector, useDispatch } from "react-redux";
import AnswerFilterList from "../Answer/AnswerFilterList";
import AnswerForm from "../Answer/AnswerForm";
import calculateVotes from "../../utils/CalculateVotes";
import {createQuestionVote} from "../../actions/question";
import {checkUpVote} from "../../utils/CheckUpVote"
import { checkDownVote } from "../../utils/CheckDownVote";
import CheckVoteType from "../../utils/CheckVoteType"
import {EditorState,convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import moment from 'moment';

const Question = (props) => {
  const { question, token , history , isLoggedIn } = props;
  const { user, subCategoryList, answers } = question;
  const [isOwner, setIsOwner] = useState(false);
  const [voteType, setVoteType] = useState("neutral");
  const [loggedInUserVote,setLoggedInUserVote] = useState({});
  const [once,setOnce] = useState(true);
  const [voteCounter,setVoteCounter] = useState(0);
  const[isWYSIWYG, setIsWYSIWYG] = useState(false);
  const [createdAt,setCreatedAt] = useState();
  
  const [textState,setTextState] = useState(EditorState.createEmpty(),);
  const SubCategoryList =
    subCategoryList.length > 0 &&
    subCategoryList.map((subCategory, index) => (
      <span key={index} className="subCategory">
        #{subCategory.name}
      </span>
    ));

  const loggedInUser = useSelector((state) => state.loginReducer.user);
  const questionOwner = question.user.id;

  const dispatch = useDispatch();
  

  const questionWeb = {
    userId: loggedInUser.id,
    id: question.id,
    voteType: voteType,
  };

  useEffect(() => {
      var date = moment(question.createdAt).fromNow();
      setCreatedAt(date);
   
    
    if(loggedInUserVote.length > 0){
      setVoteType(loggedInUserVote[0].type);
      }

    if (questionOwner === loggedInUser.id) {
      setIsOwner(true);

    }
    const votes = calculateVotes(question.votes);
    setVoteCounter(votes);
    
    if(question.text.startsWith("{")){
      setIsWYSIWYG(true);
      const raw = JSON.parse(question.text);
      const myjson = convertFromRaw(raw);
      setTextState(EditorState.createWithContent(myjson))
            
    }
  }, []);


if(once){
    setLoggedInUserVote(question.votes.filter(vote => vote.user.id === loggedInUser.id));
    setOnce(false);
  }
 
  
  const upVote = () => {
    if(isLoggedIn){
      
      const checkedVote = checkUpVote(voteType);
      setVoteType(checkedVote.voteType);
      questionWeb.voteType = checkedVote.webVoteType;
      setVoteCounter(voteCounter+checkedVote.counter);
      
    dispatch(createQuestionVote(questionWeb,token));
    } else {
      history.push("/login");
    }
  };
  
  

  const downVote = () => {   
    if(isLoggedIn){ 
      const checkedVote = checkDownVote(voteType);

      setVoteType(checkedVote.voteType);
      questionWeb.voteType = checkedVote.webVoteType;
      setVoteCounter(voteCounter+checkedVote.counter);      
      dispatch(createQuestionVote(questionWeb,token));
    }else {
      history.push("/login");
    }

  };


  return (
    <div className="question">
      <Row className="questionRow m-0">
        <div className="questionHeader">
          <h1 className="questionTitle">{question.title} </h1>
          <Col xs={6} className="questionSubCategory">
            <div>Taggar: {SubCategoryList}</div>
          </Col>
          <Col xs={6} className="questionHeaderInfo">
            <div className="userInfo">
              <div className="userInfoText"> Skapad av:<span className="userInfoCreatedBy"><img className="questionCardThumbnail" src={user.profileImageUrl} alt="thumbnail" /> {user.username}</span></div>
              <div className="userInfoText"> skapad: {createdAt}</div>
            </div>
          </Col>
        </div>

        <Row className="m-0">
          <Col xs={1} className="questionVoteCol">
        <CheckVoteType voteType={voteType} upVote={upVote} downVote={downVote} voteCounter={voteCounter}/>
          </Col>
          <Col xs={11}>
            {isWYSIWYG ?  <div>
                    <div className ="questionTextView">
                    <Editor
                     toolbarHidden={true}
                     editorState={textState}
                     readOnly={true}/>
                </div>
                </div>:
            <div className="questionText">
              <div>{question.text}</div>
            </div>}
          </Col>
        </Row>
      </Row>

      <Row className="questionFooter m-0">
        <div className="questionFooterInfo">
          <div className="userInfoText"> Senast ändrad: {createdAt}</div>
        </div>
      </Row>

      <AnswerFilterList answers={answers} isOwner={isOwner} isLoggedIn={isLoggedIn} history={history}  token={token}></AnswerFilterList>
      <AnswerForm token={token} question={question} />
    </div>
  );
};

export default Question;
