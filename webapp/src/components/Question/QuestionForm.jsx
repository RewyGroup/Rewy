import React, { useState, useEffect } from "react";
import Select,{components} from 'react-select'
import { Form, Button, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { stillLoggedIn } from "../../actions/login";
import { createQuestion } from "../../actions/question";
import { Cookies } from "react-cookie";
import "./QuestionForm.css";
import {
  getAllCategories,
} from "../../actions/category";

const QuestionForm = (props) => {
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [categoryIndex,setCategoryIndex] = useState(-1);
  const dispatch = useDispatch();

  const cookies = new Cookies();
  const session_token = cookies.get("session_token");
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  const categoryList = useSelector(
    (state) => state.categoryReducer.categoryList
  );
  const id = useSelector((state) => state.loginReducer.user.id);

  if (session_token) {
    dispatch(stillLoggedIn(session_token));
  }

  useEffect(() => {
    if (!isLoggedIn) {
      props.history.push("/login");
    }
    setUserId(id);
    dispatch(getAllCategories(session_token));
  }, []);
  

  useEffect(() => {
    if (!isLoggedIn) {
      props.history.push("/login");
    }
  }, [isLoggedIn]);


  useEffect(() => {
    const index = getIndex(category,categoryList,"typeName");
    setCategoryIndex(index);
  }, [category]);


  const questionWeb = {
    userId: userId,
    title: title,
    text: text,
    category: category,
    subCategory: subCategory,
  };

  function getIndex(category, categoryList, typeName) {
    for(var i = 0; i < categoryList.length; i++) {
        if(categoryList[i][typeName] === category) {
            return i;
            ;
        }
    }
    return -1; 
}

  const categoryOption =
    categoryList.length > 0 &&
    categoryList.map((item, index) => (
      <option key={index}>{item.typeName}</option>
    ));

    const subCategoryOption =
    categoryList.length > 0 && categoryIndex > -1 &&
    categoryList[categoryIndex].subCategoryList.map((item, index) => (
      { value: item.name, label: item.name }
    ));
      
  

  const onChangeText = (event) => {
    setText(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const onChangeSubCategory = (event) => {
    let eachVal ="";
    let selectedSubCategory =[];
    if(event){
      event.forEach((item) => { 
        eachVal = item["value"]
        selectedSubCategory.push(eachVal);
        
      });
    }
    setSubCategory(selectedSubCategory)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createQuestion(questionWeb, session_token));
  };

  const Option = props => {
    return(
    <div>
      <components.Option {...props}>
        <input type="checkbox"
        checked={props.isSelected}
        onChange ={e=> null}/>
        <label>{props.value}</label>
      </components.Option>
    </div>
    );
  }
  console.log(questionWeb);
  
  
  return (
    <Container className="questionContainer">
      <Row className="questionRow">
        <Form className="questionForm" onSubmit={handleSubmit}>
          
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Create question</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              onChange={onChangeTitle}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>choose category</Form.Label>
            <Form.Control as="select" onChange={onChangeCategory}>
              <option></option>
              {categoryOption}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>choose tags</Form.Label>
            <Select placeholder="select a tag..."  isMulti closeMenuOnSelect={false} hideSelectedOptions={false} isSearchable={false} components={{Option}} options={subCategoryOption} onChange={onChangeSubCategory} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>write your question</Form.Label>
            <Form.Control as="textarea" rows="10" onChange={onChangeText} />
          </Form.Group>

          <Form.Group>
            <Button variant="dark" type="submit">
              Create
            </Button>
          </Form.Group>

        </Form>
      </Row>
    </Container>
  );
};

export default QuestionForm;
