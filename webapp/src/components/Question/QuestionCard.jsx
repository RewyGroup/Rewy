import React from "react";
import { Card, Button, Container, Row } from "react-bootstrap";
import './QuestionCard.css';

const QuestionCard = (question) => {
  return (
    <Row className="cardRow">
      <Card className="">
        <Card.Header as="h5">Featured</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default QuestionCard;
