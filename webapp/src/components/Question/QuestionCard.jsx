import React from "react";
import { Card, Row } from "react-bootstrap";
import "./QuestionCard.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionCard = props => {

    const {question} = props;
    
     const SubCategoryList = question.subCategoryList.length > 0 &&
     question.subCategoryList.map((subCategory,index) =>( <span key={index} className="cardSubCategory">{subCategory.name}</span>));
  

  return (
    
    <Row className="cardRow">
      <Card className="cardCard">
      <div className="cardContent">
          <Card.Body className="cardBody">
            <Card.Title>{question.title}</Card.Title>
            <Card.Text>
            {question.text}
            </Card.Text>
            <Card.Footer className="cardFooter">
            <span className="cardCategory">{question.category.typeName}:</span>
            {SubCategoryList}
            </Card.Footer>
          </Card.Body>
          <Card.Body className="cardInfo">
          <Card.Text className="cardInfoText">
        <span className="cardInfoTextStat">{question.answers.length}</span>
                  <span className="cardInfoTextStat">answer</span>
              </Card.Text>
          </Card.Body>
          <Card.Body className="cardInfo">
              <Card.Text className="cardInfoText">
        <span className="cardInfoTextStat">{question.votes.length}</span>
                  <span className="cardInfoTextStat">votes</span>
              </Card.Text>
          </Card.Body>
          </div>
          <span className="cardNotify">
            <FontAwesomeIcon className="cardIcon" icon={faCheck} />
          </span>
      </Card>
    </Row>
  );
};

export default QuestionCard;
