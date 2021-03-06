import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faEye,faKeyboard} from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Button} from 'react-bootstrap';

import './Description.css';


function Description(props) {
        return (
            <div className="description">
                <Row className="descriptionHeaderRow">
                    <div className="descriptionHeaderWrapper">
                    <h1 className="descriptionHeader" >For students by students</h1>
                    <Row className="descriptionHeaderLineRow">
                    <div className="descriptionHeaderLine"></div>
                    </Row>
                    <span className="descriptionHeaderText">Our mission is to help developers write the script of the future.
                         This means helping you find and hire 
                        skilled developers for your business and providing them the tools
                        they need to share knowledge and work effectively.</span>
                        </div>                
                </Row>

            <Row className="descriptionInfoRow">
                <Col className="descriptionCol">
                <div className="descriptionInfoCard">
                <FontAwesomeIcon className="descriptionIcon" icon={faEye}/>
                <h3 className="descriptionInfoHeader">Look around</h3>
                <span className="descriptionInfoText">See if anything is interesting</span>
                </div>
                </Col>
                <Col className="descriptionCol">
                <div className="descriptionInfoCard">
                <FontAwesomeIcon className="descriptionIcon" icon={faKeyboard}/>
                <h3 className="descriptionInfoHeader">Search questions</h3>
                <span className="descriptionInfoText">search for your question</span>
                </div>
                </Col>
                <Col className="descriptionCol">
                <div className="descriptionInfoCard">
                <FontAwesomeIcon className="descriptionIcon" icon={faPencilAlt}/>
                <h3 className="descriptionInfoHeader">Create a question</h3>
                <span className="descriptionInfoText">can't find your question? Create it!</span>
                </div>
                </Col>
            </Row>
            <Row className="descriptionButtonRow">
                <div className="descriptionButtonWrapper">
            <Button className="descriptionButton" onClick={props.createQuestion}>CREATE QUESTIONS</Button>
            </div>
            </Row>
            </div>
        );
}

export default Description;