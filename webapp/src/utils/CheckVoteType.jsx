import React from "react";
import "../components/Question/Question.css";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const CheckVoteType = (props) => {
const {voteType,upVote,downVote,voteCounter}= props

    switch (voteType) {
      case "upvote":
        return (
          <div>
            <FontAwesomeIcon
              className="questionVoteIconUpVote"
              onClick={upVote}
              icon={faChevronUp}
            ></FontAwesomeIcon>
            <div>{voteCounter}</div>
            <FontAwesomeIcon
              className="questionVoteIconNeutral"
              onClick={downVote}
              icon={faChevronDown}
            ></FontAwesomeIcon>
          </div>
        );
      case "downvote":
        return (
          <div>
            <FontAwesomeIcon
              className="questionVoteIconNeutral"
              onClick={upVote}
              icon={faChevronUp}
            ></FontAwesomeIcon>
            <div>{voteCounter}</div>
            <FontAwesomeIcon
              className="questionVoteIconDownVote"
              onClick={downVote}
              icon={faChevronDown}
            ></FontAwesomeIcon>
          </div>
        );
      case "neutral":
        return (
          <div>
            <FontAwesomeIcon
              className="questionVoteIconNeutral"
              onClick={upVote}
              icon={faChevronUp}
            ></FontAwesomeIcon>
            <div>{voteCounter}</div>
            <FontAwesomeIcon
              className="questionVoteIconNeutral"
              onClick={downVote}
              icon={faChevronDown}
            ></FontAwesomeIcon>
          </div>
        );
        default:
            return(<div></div>)
    }
  };

  export default CheckVoteType;