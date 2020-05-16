import React, {useState,useEffect} from 'react';
import {Modal,Button} from 'react-bootstrap';

function ProfileModal(props) {

    

    const {show,handleUpdate, handleClose, handleShow} = props


        return (
            <>
            <Modal lg show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body className="profileModalBody">{props.showAvatar}</Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleUpdate}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
}

export default ProfileModal;