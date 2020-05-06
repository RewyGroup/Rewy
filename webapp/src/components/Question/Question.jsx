import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./Question.css";
import { Cookies } from "react-cookie";
import { faCheck, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Answer from "../Answer/Answer";


const Question = (props) => {
  const { question } = props
  const { user, category, subCategoryList, answers } = question
  console.log(answers);
  const cookies = new Cookies();
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  console.log(question)
  const [isCorrect, setIsCorrect]= useState(false);


  const SubCategoryList = subCategoryList.length > 0 &&
    subCategoryList.map((subCategory, index) => (<span key={index} className="subCategoryBubble">{subCategory.name}</span>));

  return (
    <div className="question">

      <Row className="questionRow">
        <div className="questionHeader">
          <h1 className="questionTitle">{question.title} </h1>
          <Col xs={6} className="questionSubCategory">
            <div >Tags: {SubCategoryList}</div>
          </Col>
          <Col xs={6} className="questionHeaderInfo">
            <div className="userInfo">
              <div className="userInfoText"> Posted by: {user.username}</div>
              <div className="userInfoText"> Posted at: {question.createdAt}</div>
            </div>
          </Col>
        </div>

        <Row>
          <Col xs={1} className="questionVoteCol">
            <div>
              <FontAwesomeIcon className="questionVoteIcon" icon={faChevronUp}></FontAwesomeIcon>
              <div>11230</div>
              <FontAwesomeIcon className="questionVoteIcon" icon={faChevronDown}></FontAwesomeIcon>
            </div>
          </Col>
          <Col xs={11} className="questionDescription" >
            <div className="questionText">
              <text>{question.text}</text>
            </div>
          </Col>
        </Row>

      </Row>
      <Row className="questionFooter">
        <div className="questionFooterInfo"> 
              <div className="userInfoText"> Posted by: {user.username}</div>
              <div className="userInfoText"> Last edited: {question.createdAt}</div>
            </div>
      </Row>


      <Row className="answersRow">
        <div className="answersText">{answers.length} Answers</div>
        {isCorrect ? <div className="answerIconWrapper"><FontAwesomeIcon className="answerIcon" icon={faCheck}></FontAwesomeIcon></div>:""}
        <Answer></Answer>
      </Row>



    </div>
  );
};

export default Question;
