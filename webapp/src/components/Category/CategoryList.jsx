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
  {category:"Chemestry",icon:<FontAwesomeIcon
  className="CategoryListCardIcon"
  icon={faFlask}
/>},
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

const categoryRenderOutput = categoryListItems.map((item,index)=>(<Col key={index} >
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
