

import React from "react";
import { Row, Col } from "react-bootstrap";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Answer.css";

const Answer = (props) => {
    const {answer} = props;
    const {user} = answer;
    const createdAt =answer.createdAt.replace("T"," ");
    return (
        <div>
            <Row>
                <Col xs={1} className="answerVoteCol">
                    <div>
                        <FontAwesomeIcon className="answerVoteIcon" icon={faChevronUp}></FontAwesomeIcon>
                        <div>{answer.votes.length}</div>
                        <FontAwesomeIcon className="answerVoteIcon" icon={faChevronDown}></FontAwesomeIcon>
                    </div>
                </Col>

                <Col xs={11} className="answerDescription" >

                    <Row className="answerText">
                        <div>{answer.text} </div>

                    </Row>

 

                </Col>
            </Row>
            <Row className="answerFooter" >
        <Col xs={1}></Col >
                <Col className="answerFooterCol">
                        <div className="answerFooterInfo">
                            <div className="answerUserInfoText"> Posted by: {user.username} </div>
                            <div className="answerUserInfoText"> Posted at: {createdAt}</div>
                            <div className="answerUserInfoText"> Last edited:</div>
                        </div>
                        </Col>
                    </Row>

        </div>

    )
}


export default Answer;
