

import React from "react";
import { Row, Col } from "react-bootstrap";
import { faCheck, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Answer.css";

const Answer = (props) => {

    return (
        <div>
            <Row>
                <Col xs={1} className="answerVoteCol">
                    <div>
                        <FontAwesomeIcon className="answerVoteIcon" icon={faChevronUp}></FontAwesomeIcon>
                        <div>11230</div>
                        <FontAwesomeIcon className="answerVoteIcon" icon={faChevronDown}></FontAwesomeIcon>
                    </div>
                </Col>

                <Col xs={11} className="answerDescription" >

                    <Row className="answerText">
                        <div> svars text ska vara här: </div>

                    </Row>

                    <Row className="answerFooter" >
                        <div className="answerFooterInfo">
                            <div className="answerUserInfoText"> Posted by: </div>
                            <div className="answerUserInfoText"> Last edited:</div>
                        </div>
                    </Row>

                </Col>
            </Row>

        </div>

    )
}


export default Answer;
