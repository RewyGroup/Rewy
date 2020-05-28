import React from 'react';
import {Col,Row,Button} from 'react-bootstrap';
import './Footer.css'

function FooterCard() {


        return (
            <div>
                <Row className="footerCard">
                    <Col className="footerCardTitle">
                        <h1>Varför Rewy?</h1>
                        <Row className="footerCardTitleBorderWrapper" >
                        <div className="footerCardTitleBorder"></div>
                        </Row>
                    </Col>
                </Row>
                <Row className="footerCards">
                    <Col className="footerCardContent" xs={6}>
                        <Row><Col xs={8} sm={3}>
                            <div className="footerCardImgWrapper"><img className="footerCardImg" src="/footer/user-check.png" alt="säkerhet" /></div>
                        </Col>
                            <Col className="footerCardText" xs={12} sm={9}>
                                <h3>WEBSITE SECURED</h3>
                                <p>Rewy is a protected website with signed SSL from Let's Encrypt</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="footerCardContent" xs={6}>
                    <Row>
                        <Col xs={8} sm={3}>
                            <div className="footerCardImgWrapper"><img className="footerCardImg" src="/footer/user-check.png" alt="säkerhet" /></div>
                        </Col>
                            <Col className="footerCardText" xs={12} sm={9}>
                                <h3>WEBSITE SECURED</h3>
                                <p>Rewy is a protected website with signed SSL from Let's Encrypt</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="footerCardContent" xs={6}>
                    <Row><Col xs={8} sm={3}>
                            <div className="footerCardImgWrapper"><img className="footerCardImg" src="/footer/user-check.png" alt="säkerhet" /></div>
                        </Col>
                            <Col className="footerCardText" xs={12} sm={9}>
                                <h3>WEBSITE SECURED</h3>
                                <p>Rewy is a protected website with signed SSL from Let's Encrypt</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="footerCardContent" xs={6}>
                    <Row><Col xs={8} sm={3}>
                            <div className="footerCardImgWrapper"><img className="footerCardImg" src="/footer/user-check.png" alt="säkerhet" /></div>
                        </Col>
                            <Col className="footerCardText" xs={12} sm={9}>
                                <h3>WEBSITE SECURED</h3>
                                <p>Rewy is a protected website with signed SSL from Let's Encrypt</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                </div>
        );
}

export default FooterCard;