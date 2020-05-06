import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faBasketballBall,
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
  {category:"Sports",icon:<FontAwesomeIcon
  className="CategoryListCardIcon"
  icon={faBasketballBall}
/>},
  {category:"Language",icon:<FontAwesomeIcon
  className="CategoryListCardIcon"
  icon={faGlobe}
/>},
  {category:"Code",icon:<FontAwesomeIcon
  className="CategoryListCardIcon"
  icon={faCode}
/>},
]

  
  const handleOnClick = (event) => {
    
    const category = event.currentTarget.id.toLowerCase();
    props.history.push("/question/category/" + category);

  }

const categoryRenderOutput = categoryListItems.map((item)=>(<Col>
  <Card onClick={handleOnClick} className="categoryListCard" id={item.category}>
    <Card.Body>
    {item.icon}
      <Card.Text className="categoryListCardText">{item.category}</Card.Text>
    </Card.Body>
  </Card>
</Col>)) 




  return (
    <div className="categoryList">
      <Row className="categoryListHeaderRow">
        <div className="categoryListHeaderWrapper">
          <h2 className="categoryListHeader">Categories</h2>
        </div>
      </Row>
      <Row className="categoryListRow">
        {categoryRenderOutput}
      </Row>
    </div>
  );
}
export default CategoryList;
