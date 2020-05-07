import React, { useState, useEffect } from "react";
import Select,{components} from 'react-select'
import { Form, Button, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../actions/question";

import "./QuestionForm.css";


const QuestionForm = (props) => {

  const {userId} = props

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [categoryIndex,setCategoryIndex] = useState(-1);

 
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryReducer.categoryList);

  useEffect(() => {
    const index = getIndex(category,categoryList,"typeName");
    setCategoryIndex(index);
  }, [category]);

  function getIndex(category, categoryList, typeName) {
    for(var i = 0; i < categoryList.length; i++) {
        if(categoryList[i][typeName] === category) {
            return i;
            ;
        }
    }
    return -1; 
}

  const questionWeb = {
    userId: userId,
    title: title,
    text: text,
    category: category,
    subCategory: subCategory,
  };



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
    dispatch(createQuestion(questionWeb, props.token));
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

        <Form className="questionForm" onSubmit={handleSubmit}>
          
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>choose a Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              onChange={onChangeTitle}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>choose Category</Form.Label>
            <Form.Control as="select"  onChange={onChangeCategory}>
              <option></option>
              {categoryOption}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>choose Tags</Form.Label>
            <Select className="questionMultiSelect" placeholder="select a tag..."  isMulti closeMenuOnSelect={false} hideSelectedOptions={false} isSearchable={false} components={{Option}} options={subCategoryOption} onChange={onChangeSubCategory} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Describe your Question</Form.Label>
            <Form.Control placeholder="describe..." as="textarea" rows="10" onChange={onChangeText} />
          </Form.Group>

          <Form.Group>
            <Button variant="dark" type="submit">
              Create
            </Button>
         </Form.Group>
        </Form>
  );
};

export default QuestionForm;
