
import React, { useState, useEffect } from "react";
import { Row,Toast } from "react-bootstrap";
import "./QuestionSuccessToast.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const QuestionSuccessToast = (props) => {
    const {showSuccessToast} = props;
    const [show, setShow] = useState(false);
  
    useEffect(()=>{
        if(showSuccessToast)
        setShow(showSuccessToast)
    },[])
    return (

          <Toast className="toastContent" animation onClose={() => setShow(false)} show={show} delay={5000} autohide>
              <Toast.Header className="toastContentHeader" >
              <Toast.Body className="mr-auto">
                Question successfully created! <FontAwesomeIcon icon={faCheck} className="toastContentIcon"/>
            </Toast.Body>
              </Toast.Header>


          </Toast>
    );
  }
  
  export default QuestionSuccessToast;