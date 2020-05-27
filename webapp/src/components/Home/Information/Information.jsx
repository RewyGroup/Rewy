import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./Information.css";

function Information(props) {
  return (
    <div>
      <Row className="information">
        <Col className="informationCol" md={4}  lg={4} xl={4}>
        <div className="informationCard">
        <img className="informationCardImg" src="/discover.png" alt="utforska" />
        <h2>utforska</h2>
        <p>kolla runt på sidan och se ifall du hittar något intressant.</p></div>
        </Col>
        <Col className="informationCol" md={4} lg={4} xl={4}>
 
    <div className="informationCard">
        <img className="informationCardImg" src="/search.png" alt="sök" />
    <h2>sök på sidan</h2>
    <p>använd vår sök funktion för att leta rätt på din fråga.</p></div>
        </Col>
        <Col className="informationCol"  md={4} lg={4} xl={4}>
            
        <div className="informationCard">
        <img className="informationCardImg" src="/ask.png" alt="fråga" />
            <h2>fråga</h2>
            <p>finner du inte frågan? skapa den genom att trycka på knappen nedan.</p>
            </div>
        </Col>
      </Row>
      <div className="informationButtonWrapper">
      <Button className="informationButton" onClick={props.createQuestion}>STÄLL EN FRÅGA</Button>
      </div>
      </div>

  );
}

export default Information;
