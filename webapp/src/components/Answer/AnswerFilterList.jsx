import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Answer from "../Answer/Answer";
import './AnswerFilterList.css'



const AnswerFilterList = (props) => {
 const {answers, isOwner,isLoggedIn,history,token} = props;
 const [isCorrect, setIsCorrect]= useState(false);

const correctAnswer = answers.filter(answer => answer.correct ===true).map(
    (answer,index) => (<Answer key={index} answer={answer} hasCorrect={true} isOwner={isOwner} isLoggedIn={isLoggedIn} history={history} token={token} ></Answer>));


const answersList = answers.length > 0 && 
    answers.filter(answer=>answer.correct===false).map(
    (answer,index) => (<Answer key={index} answer={answer} hasCorrect={isCorrect} isOwner={isOwner} isLoggedIn={isLoggedIn} history={history} token={token}></Answer>))


    useEffect(() => {

        if(correctAnswer.length > 0){
            setIsCorrect(true)
        }
      }, []);
    

    return( <Row className="answersRow">
     <Row className="answersCheckerRow">
     <Col xs={2}><div className="answersText">{answers.length} Answers</div></Col>

     <Col  className="answersChecker"> {isCorrect ?
      <div className="answerIconWrapper">
          <FontAwesomeIcon className="answerIcon" icon={faCheck}></FontAwesomeIcon></div>:""}</Col>

     </Row>
     {correctAnswer}
     {answersList}

   </Row>

    )

}

export default AnswerFilterList;