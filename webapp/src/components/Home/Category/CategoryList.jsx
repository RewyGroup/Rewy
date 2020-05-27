import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faFlask,
  faGlobe,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import "./CategoryList.css";

const CategoryList =(props) => {

const categoryListItems = [
  {category:"Mathematics",icon:<FontAwesomeIcon
  className="CategoryListCardIcon"
  icon={faCalculator}
/>},
  {category:"KEMI",icon:<img className="CategoryListCardIcon" src="/kategorier/kemi.png" alt="kemi" />},
  {category:"Language",icon:<FontAwesomeIcon
  className="CategoryListCardIcon"
  icon={faGlobe}
/>},
  {category:"Programming",icon:<FontAwesomeIcon
  className="CategoryListCardIcon"
  icon={faCode}
/>},
]

  
  const handleOnClick = (event) => {
    
    const category = event.currentTarget.id.toLowerCase();
    props.history.push("/question/category/" + category);

  }

const categoryRenderOutput = categoryListItems.map((item,index)=>(<Col className="categoryBoxSize" xs={6} lg={3} key={index}>
  <Card onClick={handleOnClick} className="categoryListCard" id={item.category}>
    <Card.Body>
    {item.icon}
      <Card.Text className="categoryListCardText">{item.category}</Card.Text>
    </Card.Body>
  </Card>
</Col>)) 




  return (
    <div>
      <Row className="categoryBanner">
        <Col className="categoryBannerHeader"><h1>Kategorier</h1>
        <h2>bläddra bland alla kategorier</h2>
        </Col>
        <Col>
          <img className="categoryBannerImg" src="/choose.png" alt="fråga" />
        </Col>
        </Row>
      <Row className="categoryListRow">
        {categoryRenderOutput}
      </Row>
    </div>
  );
}
export default CategoryList;
