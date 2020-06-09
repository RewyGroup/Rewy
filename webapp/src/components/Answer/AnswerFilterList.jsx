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
    

    return( <Row className="answersRow m-0">
     <Row className="answersCheckerRow m-0">
     <Col xs={2}><div className="answersText">{answers.length} Svar</div></Col>

     <Col  className="answersChecker"> {isCorrect ?
      <div className="answerIconWrapper">
          <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.8408 43.5755C48.8408 44.9716 48.2862 46.3105 47.2991 47.2978C46.312 48.285 44.9732 48.8398 43.5771 48.84H5.26367C3.86759 48.8398 2.52876 48.285 1.54165 47.2978C0.554539 46.3105 -1.47642e-08 44.9716 0 43.5755L0 5.26367C0.000608689 3.86785 0.555368 2.52936 1.54237 1.54237C2.52936 0.555368 3.86785 0.000608689 5.26367 0L43.5771 0C44.973 0.000405899 46.3116 0.5551 47.2986 1.54214C48.2857 2.52918 48.8403 3.86778 48.8408 5.26367V43.5755Z" fill="#37B34A"/>
<path d="M41.2419 10.8258C40.5233 10.2121 39.5905 9.90878 38.6484 9.98257C37.7063 10.0564 36.8321 10.5012 36.2179 11.2193L20.8747 29.1632L12.6205 22.2726C12.2938 21.9915 11.9144 21.7782 11.5044 21.645C11.0945 21.5119 10.6622 21.4615 10.2326 21.4969C9.80302 21.5323 9.38476 21.6527 9.00213 21.8511C8.6195 22.0496 8.28013 22.3221 8.00376 22.6529C7.72738 22.9836 7.51951 23.366 7.39223 23.7779C7.26495 24.1897 7.22079 24.6227 7.26233 25.0517C7.30387 25.4807 7.43027 25.8972 7.63419 26.277C7.83811 26.6567 8.11548 26.9921 8.45018 27.2637L19.5089 36.4972C19.8499 36.7815 20.2458 36.9925 20.6719 37.1171C21.098 37.2417 21.5452 37.2772 21.9857 37.2215C22.4528 37.1854 22.9082 37.0575 23.3258 36.8452C23.7435 36.6329 24.1152 36.3403 24.4196 35.9842L41.6331 15.8483C42.2462 15.1294 42.5489 14.1966 42.475 13.2547C42.4011 12.3128 41.9565 11.4387 41.2388 10.8242" fill="#F4F4F4"/>
</svg>
</div>:""}</Col>

     </Row>
     {correctAnswer}
     {answersList}

   </Row>

    )

}

export default AnswerFilterList;