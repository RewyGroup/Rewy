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
import {Editor, EditorState,convertFromRaw} from 'draft-js';

const Question = (props) => {
  const { question, token , history , isLoggedIn } = props;
  const { user, subCategoryList, answers } = question;
  const [isOwner, setIsOwner] = useState(false);
  const [voteType, setVoteType] = useState("neutral");
  const [loggedInUserVote,setLoggedInUserVote] = useState({});
  const [once,setOnce] = useState(true);
  const [voteCounter,setVoteCounter] = useState(0);
  const[isWYSIWYG, setIsWYSIWYG] = useState(false);
  const createdAt = question.createdAt.replace("T", " ");
  const [textState,setTextState] = useState(EditorState.createEmpty(),);
  const SubCategoryList =
    subCategoryList.length > 0 &&
    subCategoryList.map((subCategory, index) => (
      <span key={index} className="subCategoryBubble">
        {subCategory.name}
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
      <Row className="questionRow">
        <div className="questionHeader">
          <h1 className="questionTitle">{question.title} </h1>
          <Col xs={6} className="questionSubCategory">
            <div>Tags: {SubCategoryList}</div>
          </Col>
          <Col xs={6} className="questionHeaderInfo">
            <div className="userInfo">
              <div className="userInfoText"> Posted by: {user.username}</div>
              <div className="userInfoText"> Posted at: {createdAt}</div>
            </div>
          </Col>
        </div>

        <Row>
          <Col xs={1} className="questionVoteCol">
        <CheckVoteType voteType={voteType} upVote={upVote} downVote={downVote} voteCounter={voteCounter}/>
          </Col>
          <Col xs={11}>
            {isWYSIWYG ?  <div>
                    <div className ="questionTextView">
                <Editor placeholder="" editorState={textState} readOnly={true} /> 
                </div>
                </div>:
            <div className="questionText">
              <div>{question.text}</div>
            </div>}
          </Col>
        </Row>
      </Row>

      <Row className="questionFooter">
        <div className="questionFooterInfo">
          <div className="userInfoText"> Posted by: {user.username}</div>
          <div className="userInfoText"> Last edited: {createdAt}</div>
        </div>
      </Row>

      <AnswerFilterList answers={answers} isOwner={isOwner} isLoggedIn={isLoggedIn} history={history}  token={token}></AnswerFilterList>
      <AnswerForm token={token} question={question} />
    </div>
  );
};

export default Question;
