import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faBasketballBall,
  faGlobe,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import "./CategoryList.css";

function CategoryList() {
  return (
    <div className="categoryList">
      <Row className="categoryListHeaderRow">
        <div className="categoryListHeaderWrapper">
          <h2 className="categoryListHeader">Categories</h2>
        </div>
      </Row>
      <Row className="categoryListRow">
        <Col>
          <Card className="categoryListCard">
            <Card.Body>
              <FontAwesomeIcon
                className="CategoryListCardIcon"
                icon={faCalculator}
              />
              <Card.Text className="categoryListCardText">math</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="categoryListCard">
            <Card.Body>
              <FontAwesomeIcon
                className="CategoryListCardIcon"
                icon={faBasketballBall}
              />
              <Card.Text className="categoryListCardText">Sport</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="categoryListCard">
            <Card.Body>
              <FontAwesomeIcon
                className="CategoryListCardIcon"
                icon={faGlobe}
              />
              <Card.Text className="categoryListCardText">Language</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="categoryListCard">
            <Card.Body>
              <FontAwesomeIcon
                className="CategoryListCardIcon"
                icon={faCode}
              />
              <Card.Text className="categoryListCardText">Code</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        

      </Row>
    </div>
  );
}
export default CategoryList;
