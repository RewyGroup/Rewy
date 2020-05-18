
import React, { useState, useEffect } from "react";
import {Toast } from "react-bootstrap";
import "./SuccessToast.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SuccessToast = (props) => {
    const {showSuccessToast,message} = props;
    const [show, setShow] = useState(false);
  
    useEffect(()=>{
        if(showSuccessToast)
        setShow(showSuccessToast)
    },[])
    return (

          <Toast className="toastContent" animation onClose={() => setShow(false)} show={show} delay={5000} autohide>
              <Toast.Header className="toastContentHeader" >
              <Toast.Body className="mr-auto">
                {message} <FontAwesomeIcon icon={faCheck} className="toastContentIcon"/>
            </Toast.Body>
              </Toast.Header>


          </Toast>
    );
  }
  
  export default SuccessToast;