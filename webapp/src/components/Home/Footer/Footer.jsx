import React from 'react';
import {Col,Row,Button} from 'react-bootstrap';
import './Footer.css'

function Footer() {


        return (

                <Row  className="footer mr-0">
                    <Col className="footerCopyright" xs={{span:6,offset:2}}><div className="footerCopyrightText"><h3>©2020 RewyGroup</h3></div></Col>
                    <Col className="footerPolicy" xs={{span:3,offset:-1}}> <div className="footerCopyrightText"><h3>Policy</h3></div></Col>
                </Row>

        );
}

export default Footer;