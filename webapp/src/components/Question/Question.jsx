import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./Question.css";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import AnswerFilterList from "../Answer/AnswerFilterList";
import AnswerForm from "../Answer/AnswerForm";
import calculateVotes from "../../utils/CalculateVotes";
import {createQuestionVote} from "../../actions/question";

const Question = (props) => {
  const { question, token , history , isLoggedIn } = props;
  const { user, category, subCategoryList, answers } = question;
  const [isOwner, setIsOwner] = useState(false);
  const [voteType, setVoteType] = useState("neutral");
  const [loggedInUserVote,setLoggedInUserVote] = useState({});
  const [once,setOnce] = useState(true);
  const [voteCounter,seVoteCounter] = useState(0);

  const createdAt = question.createdAt.replace("T", " ");

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
 
    if (questionOwner === loggedInUser.id) {
      setIsOwner(true);
      if(loggedInUserVote.length > 0){
      setVoteType(loggedInUserVote[0].type);
      }
    }
    const votes = calculateVotes(question.votes);
    seVoteCounter(votes);
  
  }, []);


if(once){
    setLoggedInUserVote(question.votes.filter(vote => vote.user.id === loggedInUser.id));
    setOnce(false);
  }
 

  const upVote = (votes) => {
    if(isLoggedIn){

      if(voteType === "downvote"){
        
        setVoteType("upvote"); 
        questionWeb.voteType = "UPVOTE"; 
        seVoteCounter(voteCounter+2);
      }  
      else if (voteType === "upvote") {
        setVoteType("neutral");
        questionWeb.voteType = "NEUTRAL";
        seVoteCounter(voteCounter-1);
      } else {
        setVoteType("upvote");
        questionWeb.voteType = "UPVOTE";
        seVoteCounter(voteCounter+1);
      }
    dispatch(createQuestionVote(questionWeb,token));
    } else {
      history.push("/login");
    }
  };
  
  

  const downVote = (votes) => {   
    if(isLoggedIn){ 
      if(voteType === "upvote"){
        setVoteType("downvote"); 
        questionWeb.voteType = "DOWNVOTE"; 
        seVoteCounter(voteCounter-2); 
      }  
      else if (voteType === "downvote") {
        setVoteType("neutral");
        questionWeb.voteType = "NEUTRAL";
        seVoteCounter(voteCounter+1);

      } else {
        setVoteType("downvote"); 
        questionWeb.voteType = "DOWNVOTE"; 
        seVoteCounter(voteCounter-1);
      }
      dispatch(createQuestionVote(questionWeb,token));
    }else {
      history.push("/login");
    }

  };


  const checkVoteType = (voteType) => {

    switch (voteType) {
      case "upvote":
        return (
          <div>
            <FontAwesomeIcon
              className="questionVoteIconUpVote"
              onClick={upVote}
              icon={faChevronUp}
            ></FontAwesomeIcon>
            <div>{voteCounter}</div>
            <FontAwesomeIcon
              className="questionVoteIconNeutral"
              onClick={downVote}
              icon={faChevronDown}
            ></FontAwesomeIcon>
          </div>
        );
      case "downvote":
        return (
          <div>
            <FontAwesomeIcon
              className="questionVoteIconNeutral"
              onClick={upVote}
              icon={faChevronUp}
            ></FontAwesomeIcon>
            <div>{voteCounter}</div>
            <FontAwesomeIcon
              className="questionVoteIconDownVote"
              onClick={downVote}
              icon={faChevronDown}
            ></FontAwesomeIcon>
          </div>
        );
      case "neutral":
        return (
          <div>
            <FontAwesomeIcon
              className="questionVoteIconNeutral"
              onClick={upVote}
              icon={faChevronUp}
            ></FontAwesomeIcon>
            <div>{voteCounter}</div>
            <FontAwesomeIcon
              className="questionVoteIconNeutral"
              onClick={downVote}
              icon={faChevronDown}
            ></FontAwesomeIcon>
          </div>
        );
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
        {checkVoteType(voteType)}
          </Col>
          <Col xs={11}>
            <div className="questionText">
              <div>{question.text}</div>
            </div>
          </Col>
        </Row>
      </Row>

      <Row className="questionFooter">
        <div className="questionFooterInfo">
          <div className="userInfoText"> Posted by: {user.username}</div>
          <div className="userInfoText"> Last edited: {createdAt}</div>
        </div>
      </Row>

      <AnswerFilterList answers={answers} isOwner={isOwner}></AnswerFilterList>
      <AnswerForm token={token} question={question} />
    </div>
  );
};

export default Question;
