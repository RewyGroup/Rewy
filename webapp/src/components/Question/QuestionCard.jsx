import React, { useState, useEffect } from "react";
import { Row,Col } from "react-bootstrap";
import "./QuestionCard.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import calculateVotes from "../../utils/CalculateVotes";


const QuestionCard = props => {
    const {question,history} = props;
    const {answers} = question;

    const [hasCorrectAnswer,setCorrectAnswer]= useState(false);
   
    const correctAnswer = answers.length > 0 && 
    answers.filter(answer=>answer.correct===true);

    useEffect(() => {
      if(correctAnswer.length > 0 ){
        setCorrectAnswer(true);
      }
  }, [])

    const SubCategoryList = question.subCategoryList.length > 0 &&
    question.subCategoryList.map((subCategory,index) =>( <span key={index} className="questionCardSubCategory"> #{subCategory.name}</span>));

     const handleOnClick = (e) => {
      e.preventDefault();
      const path = '/question/' + question.id;
      history.push({pathname:path, question:question});
    }

  return (
    
    <Row onClick={handleOnClick} className="cardRow mr-0">
      <Col className="questionCardVotes" xs={1}><div>{calculateVotes(question.votes)}</div><div><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4064 6.86802C16.1676 6.58127 15.8687 6.35044 15.5308 6.19182C15.193 6.0332 14.8245 5.95066 14.4513 5.95002H10.5749L11.051 4.73453C11.249 4.20233 11.3149 3.63004 11.2431 3.06676C11.1714 2.50348 10.964 1.96602 10.6388 1.50048C10.3137 1.03494 9.88043 0.655213 9.37626 0.393879C8.8721 0.132544 8.31205 -0.00260051 7.74417 3.79025e-05C7.58065 0.000379059 7.4207 0.0478718 7.28349 0.136822C7.14629 0.225772 7.03765 0.352404 6.97061 0.501537L4.5479 5.95002H2.55022C1.87386 5.95002 1.2252 6.21868 0.746943 6.6969C0.268683 7.17512 0 7.82372 0 8.50002V14.45C0 15.1263 0.268683 15.7749 0.746943 16.2531C1.2252 16.7313 1.87386 17 2.55022 17H13.3717C13.9683 16.9998 14.5459 16.7905 15.0041 16.4084C15.4623 16.0264 15.772 15.4958 15.8794 14.909L16.959 8.95902C17.0257 8.59129 17.0109 8.21338 16.9154 7.85205C16.8199 7.49071 16.6461 7.15477 16.4064 6.86802V6.86802ZM4.25037 15.3H2.55022C2.32477 15.3 2.10855 15.2105 1.94913 15.051C1.78971 14.8916 1.70015 14.6754 1.70015 14.45V8.50002C1.70015 8.27459 1.78971 8.05839 1.94913 7.89898C2.10855 7.73957 2.32477 7.65002 2.55022 7.65002H4.25037V15.3ZM15.3013 8.65302L14.2217 14.603C14.1855 14.801 14.0802 14.9798 13.9245 15.1074C13.7689 15.235 13.573 15.3033 13.3717 15.3H5.95052V6.97852L8.26272 1.77653C8.50073 1.84592 8.72177 1.96388 8.91188 2.12298C9.102 2.28208 9.25707 2.47886 9.3673 2.7009C9.47753 2.92294 9.54054 3.16542 9.55233 3.41304C9.56412 3.66065 9.52445 3.90802 9.43582 4.13953L8.98528 5.35503C8.88928 5.61194 8.85687 5.88827 8.89082 6.16043C8.92476 6.43258 9.02406 6.69248 9.18023 6.91795C9.3364 7.14342 9.54481 7.32776 9.78767 7.45523C10.0305 7.58271 10.3006 7.64954 10.5749 7.65002H14.4513C14.5761 7.64982 14.6995 7.67713 14.8127 7.73002C14.9258 7.78291 15.0259 7.86007 15.1058 7.95602C15.1877 8.05065 15.2477 8.16218 15.2815 8.28267C15.3153 8.40315 15.3221 8.52961 15.3013 8.65302Z" fill="#295374"/>
</svg>
</div></Col>
      <Col className="questionCardInfo" xs={11}>
        <div className="questionCardCreatedInfo">
        <Col xs={6} className="questionCardCreatedBy">skapad av:<span className="questionCardCreatedByName">{question.user.username}</span>
        </Col>
        <Col xs={3} className="questionCardComments"><svg className="questionCardCommentIcon" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.875 0H13.125C14.1592 0 15 0.84082 15 1.875V10.3125C15 11.3467 14.1592 12.1875 13.125 12.1875H10.3125V14.6484C10.3125 14.8564 10.1426 15 9.96094 15C9.89062 15 9.81738 14.9795 9.75293 14.9297L6.09375 12.1875H1.875C0.84082 12.1875 0 11.3467 0 10.3125V1.875C0 0.84082 0.84082 0 1.875 0ZM1.40625 10.3125C1.40625 10.5703 1.61719 10.7812 1.875 10.7812H6.5625L6.9375 11.0625L8.90625 12.5391V10.7812H13.125C13.3828 10.7812 13.5938 10.5703 13.5938 10.3125V1.875C13.5938 1.61719 13.3828 1.40625 13.125 1.40625H1.875C1.61719 1.40625 1.40625 1.61719 1.40625 1.875V10.3125Z" fill="#285273"/>
</svg>{question.answers.length} svar
        </Col>
        <Col xs={3} className="questionCardCreatedByTime">{question.createdAt.replace("T", " ")}</Col>
        </div>
      <div className="questionCardTitle">{question.title}</div>
      <div className="questionCardCategory">
      <div className="questionCardCategoryName"><div className="questionCardCategoryNameWrapper">{question.category.typeName}</div></div>
      <div className="questionCardSubCategory">{SubCategoryList}</div>
        </div>
        { hasCorrectAnswer ? 
          <span className="cardNotify">
            <FontAwesomeIcon className="cardIcon" icon={faCheck} />
          </span>:""}
      </Col>
    </Row>
  );
};

export default QuestionCard;
