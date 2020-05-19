import React, {useState,useEffect} from 'react';
import {Modal,Button, ModalBody, Form} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {updateProfileInformation} from '../../actions/user';
import './ProfileEditModal.css';

function ProfileEditModal(props) {

    
    const {token, show, handleUpdate, handleClose, user } = props

    const errorMessage = useSelector(state => state.userReducer.error);
    const updatedProfile = useSelector(state => state.userReducer.updatedProfile);
    const dispatch = useDispatch();


    const [state , setState] = useState({
        username : user.username,
        email : user.email,
        firstName: user.firstName,
        lastName : user.lastName,
        gender : user.gender,
        dateOfBirth : user.dateOfBirth,
        occupation : user.occupation,
    })
    

    const updatedUser = {
        id : user.id,
        username : state.username,
        email : state.email,
        firstName : state.firstName,
        lastName : state.lastName,
        profileImageUrl : user.profileImageUrl,
        occupation : state.occupation,
      };
    
    const handleChange = event => {

        const {name , value} = event.target
        setState( prevState => ({
            ...prevState,
            [name] : value
        }))
        
    }

    const handleSubmit = event => {
        event.preventDefault();

         dispatch(updateProfileInformation(updatedUser,token));

      }
    
      useEffect(() =>{

        if(updatedProfile){
          handleUpdate();
        }
        
        },[updatedProfile]);
    
      
    console.log(updatedUser);
    
    function userInformation() {

        let list = [];
    
        for(let[key,value] of Object.entries(user)){
            if(key !== "id" && key !== "profileImageUrl" && key !== "role" && key !== "createdAt" && key !== "gender" && key !== "dateOfBirth" && key !== "username"  ){
        list.push(<Form.Group>
        <Form.Label className="profileEditModalFormLabel">{key}</Form.Label>
        <Form.Control name={key} onChange={handleChange} type="text" placeholder={value} />
      </Form.Group>);
            }   
        }
    
    return list;
    }

    

        return (
            <>
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header className="profileEditMoldalHeader" closeButton>
              </Modal.Header>
              <Form onSubmit={handleSubmit}>
                  <Modal.Body>
                {userInformation()}
                </Modal.Body>
              <Modal.Footer className="profileEditMoldalFooter">
                <Button variant="success" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
              {errorMessage ? <div className="profileEditMoldalError">{errorMessage}</div> : <div></div>}
              </Form>
            </Modal>
          </>
        );
}

export default ProfileEditModal;