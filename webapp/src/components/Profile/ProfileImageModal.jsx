import React, {useState,useEffect} from 'react';
import {Modal,Button} from 'react-bootstrap';

function ProfileImageModal(props) {

    

    const {show,handleUpdate, handleClose} = props


        return (
            <>
            <Modal show={show} onHide={handleClose} centered>
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

export default ProfileImageModal;