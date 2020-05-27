import React from 'react';
import {Col,Row,Button} from 'react-bootstrap';
import './Landing.css'

function Landing() {


        return (
                <Row className="landing">
                    <Col className="landingTitle" xs={12} md={7} ><h1>För studenter av studenter</h1>
                    <h2>En webbsida för alla studenter över hela landet</h2>
                    <Button className="landingButton">LOGGA IN</Button>
                    </Col>
                <Col className="landingImgWrapper" xs={5}>
                <img className="landingImg" src="/girl_study.png" alt="Card image" />
                </Col>
                </Row>
        );
}

export default Landing;