import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./ProfileCard.css";

const ProfileCard = () => {
  return (
    <Row className="profileCardRow">
      <Col xs={6} md={12}>
        <Card className="profileCard">
          <Card.Img src="/banner.jpg" alt="Card image" />
          <Card.ImgOverlay>
            <div className="profileCardEditButtonWrapper">
              <FontAwesomeIcon
                className="profileCardEditButton"
                icon={faEdit}
              />
            </div>
          </Card.ImgOverlay>
        </Card>
        <Card>
          <Card.Body>
            <div className="profileCardButtonWrapper" >
            <Button className="ProfileCardButton">press me</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileCard;
