import React from 'react';
import { Card,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './QuestionFormInfo.css'

const QuestionFormInfo = () => {
        return (
            <Card className="questionFormInfoCard text-center">
  <Card.Header className="questionFormInfoCardHeader">Create Question</Card.Header>
  <Card.Body>
    <Card.Title className="questionFormInfoCardTitle">Step 1</Card.Title>
    <Card.Text className="questionFormInfoCardText">
      Select a title for your Question
    </Card.Text>
  </Card.Body>
  <Card.Body>
    <Card.Title className="questionFormInfoCardTitle">Step 2</Card.Title>
    <Card.Text className="questionFormInfoCardText">
      Choose a Category and also Tags
    </Card.Text>
    </Card.Body>
    <Card.Body>
    <Card.Title className="questionFormInfoCardTitle">Step 3</Card.Title>
    <Card.Text className="questionFormInfoCardText">
      Write your question thoroughly
    </Card.Text>
  </Card.Body>
</Card>
        );
}

export default QuestionFormInfo;