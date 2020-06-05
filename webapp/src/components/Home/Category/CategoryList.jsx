import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./CategoryList.css";
import { useDispatch } from 'react-redux';
import {selectedCategory} from '../../../actions/category'


const CategoryList =(props) => {
const dispatch = useDispatch();
const categoryListItems = [
  {category:"MATEMATIK",icon:<img className="CategoryListCardIcon" src="/kategorier/matematik.png" alt="matematik" />},
  {category:"KEMI",icon:<img className="CategoryListCardIcon" src="/kategorier/kemi.png" alt="kemi" />},
  {category:"SPRÅK",icon:<img className="CategoryListCardIcon" src="/kategorier/sprak.png" alt="språk" />},
  {category:"PROGRAMMERING",icon:<img className="CategoryListCardIcon" src="/kategorier/programmering.png" alt="programmering" />},
]

  
  const handleOnClick = (event) => {
    
    const category = event.currentTarget.id.toLowerCase();
    dispatch(selectedCategory(category))
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
