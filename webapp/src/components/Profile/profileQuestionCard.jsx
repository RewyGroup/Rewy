import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./ProfileQuestionCard.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';


const ProfileQuestionCard = (props) => {
  const { question, history } = props;

  const [hasCorrectAnswer, setCorrectAnswer] = useState(false);
  const createdAt =moment(question.createdAt).fromNow();


  useEffect(() => {
    if (correctAnswer.length > 0) {
      
      setCorrectAnswer(true);
    }
    else{
      setCorrectAnswer(false)
    }
  }, [question]);
  

const correctAnswer =
question.answers.length > 0 && question.answers.filter((answer) => answer.correct === true);

const SubCategoryList =
question.subCategoryList.length > 0 &&
question.subCategoryList.map((subCategory, index) => (
  <span key={index} className="questionCardSubCategory">
    #{subCategory.name}
  </span>
));

const handleOnClick = (e) => {
    e.preventDefault();
    const path = "/question/" + question.id;
    history.push({ pathname: path, question: question });
  };

  return (

    <Row  onClick={handleOnClick} className="profileQuestionCard mr-0 ml-0">

      <Col className="profileQuestionCardInfo" xs={12}>
        <div className="questionCardCreatedInfo">
          <Col xs={6} className="questionCardCreatedBy">
            skapad av:
            <span>
              <img
                className="questionCardThumbnail"
                src={question.user.profileImageUrl}
                alt="thumbnail"
              />
            </span>
            <span className="questionCardCreatedByName">
              {question.user.username}
            </span>
          </Col>
          <Col xs={3} className="questionCardComments">
            <svg
              className="questionCardCommentIcon"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.875 0H13.125C14.1592 0 15 0.84082 15 1.875V10.3125C15 11.3467 14.1592 12.1875 13.125 12.1875H10.3125V14.6484C10.3125 14.8564 10.1426 15 9.96094 15C9.89062 15 9.81738 14.9795 9.75293 14.9297L6.09375 12.1875H1.875C0.84082 12.1875 0 11.3467 0 10.3125V1.875C0 0.84082 0.84082 0 1.875 0ZM1.40625 10.3125C1.40625 10.5703 1.61719 10.7812 1.875 10.7812H6.5625L6.9375 11.0625L8.90625 12.5391V10.7812H13.125C13.3828 10.7812 13.5938 10.5703 13.5938 10.3125V1.875C13.5938 1.61719 13.3828 1.40625 13.125 1.40625H1.875C1.61719 1.40625 1.40625 1.61719 1.40625 1.875V10.3125Z"
                fill="#285273"
              />
            </svg>
            {question.answers.length} svar
          </Col>
          <Col xs={3} className="questionCardCreatedByTime">
            {createdAt}
          </Col>
        </div>
        <div className="questionCardTitle">{question.title}</div>

        <Row>
          <Col xs={6} sm={9}>
            <div className="questionCardCategory">
              <div className="questionCardCategoryName">
                <div className="questionCardCategoryNameWrapper">
                  {question.category.typeName}
                </div>
              </div>
              <div className="questionCardSubCategory">{SubCategoryList}</div>
            </div>
          </Col>

        </Row>
        {hasCorrectAnswer ? (
          <span className="cardNotify">
            <FontAwesomeIcon className="cardIcon" icon={faCheck} />
          </span>
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
};

export default ProfileQuestionCard;
