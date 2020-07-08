import React, {useEffect} from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './ProfilePreference.css';

function ProfilePreference(props) {
    const {userPreferenceList} = props;

        return (
    <Col className="profileCardPrefrencesWrapper">
      <Row className="m-0">
      <Col xs={4}>
      <div className="profileCardPreferenceWrapper"><div className="profileCardPreferences">{userPreferenceList}</div></div>
      </Col>
      <Col xs={8}>
      <div className="profileCardPreferenceEditWrapper"><div className="profileCardPreferenceEdit"><Button className="profileCardPreferenceEditButton">Redigera preferenser</Button></div></div>
      </Col>
      </Row>
    </Col>
        );
}

export default ProfilePreference;