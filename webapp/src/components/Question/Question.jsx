import React from "react";
import { Card, Row } from "react-bootstrap";
import "./QuestionCard.css";
import {useDispatch } from 'react-redux';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Question = (props) => {
    const {question} = props
    const {user, category, subCategoryList,answers} = question
    console.log(answers);
    
    const SubCategoryList = subCategoryList.length > 0 &&
    subCategoryList.map((subCategory,index) =>( <span key={index} className="cardSubCategory">{subCategory.name}</span>));

  return (
    
    <Row style={{border:"solid 1px ", borderTop:"0", display: "block"}}>
        <div style={{borderBottom:"solid 1px", textAlign:"left"}}>
            <h1 style={{marginLeft:"10px"}}>{question.title} </h1>
            <text style={{ textAlign:"left"}}> Posted by: {user.username}</text>

        </div>

        <div style={{height:"500px",textAlign:"left"}}>
            <text>asdasdsaasd</text>
        </div>

    </Row>
  );
};

export default Question;
