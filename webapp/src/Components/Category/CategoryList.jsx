import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator,faBasketballBall,faGlobe,faCode} from "@fortawesome/free-solid-svg-icons";
import "./CategoryList.css";

function CategoryList() {
  return (
    <Container>
      <Row>
        <Col className="md-5">
          <h3>Browse Categories</h3>
        </Col>
      </Row>
      <Row>
        <Col className="md-3 category-block">
          <div>
            <FontAwesomeIcon
              className="category-block-svg"
              icon={faCalculator}
            />
          </div>
          <h5>Math</h5>
        </Col>
        <Col className="md-3 category-block">
          <div>
            <FontAwesomeIcon
              className="category-block-svg"
              icon={faGlobe}
            />
          </div>
          <h5>Language</h5>
        </Col>
        <Col className="md-3 category-block">
          <div>
            <FontAwesomeIcon
              className="category-block-svg"
              icon={faCode}
            />
          </div>
          <h5>Code</h5>
        </Col>
        <Col className="md-3 category-block">
          <div>
            <FontAwesomeIcon
              className="category-block-svg"
              icon={faBasketballBall}
            />
          </div>
          <h5>Sports</h5>
        </Col>
      </Row>
    </Container>
  );
}
export default CategoryList;
