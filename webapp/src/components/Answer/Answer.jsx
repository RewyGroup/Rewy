

import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {Cookies} from 'react-cookie';
import { faChevronUp, faChevronDown,faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Answer.css";
import {setCorrectAnswer} from '../../actions/answer'

const Answer = (props) => {
    const {answer,hasCorrect,isOwner} = props;
    const {user} = answer;
    const cookies = new Cookies();
    const session_token = cookies.get("session_token");
    const dispatch = useDispatch();

    const createdAt =answer.createdAt.replace("T"," ");

    const handleOnClickCorrect = event =>{        
        dispatch(setCorrectAnswer(answer.id,session_token));
        window.location.reload();

    }

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
                <Col xs={1} className="answerButtonCol" >
                    {!hasCorrect && isOwner ? <Button onClick={handleOnClickCorrect} className="correctButton" variant="success" value={answer.id}>Correct</Button>:""}
                    </Col>
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
