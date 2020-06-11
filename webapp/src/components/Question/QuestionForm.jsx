import React, { useState, useEffect } from "react";
import Select,{components} from 'react-select'
import { Form, Button, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../../actions/question";
import {EditorState,convertToRaw} from 'draft-js';
import "../../utils/TextEditor.css"
import "./QuestionForm.css";
import { Editor } from 'react-draft-wysiwyg';
import QuestionFormInfo from "../Question/QuestionFormInfo";

const QuestionForm = (props) => {

  const {userId} = props
  const [editorState,setEditorState] = useState(EditorState.createEmpty(),);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [categoryIndex,setCategoryIndex] = useState(-1);
  const [titleState,setTitleState] = useState("NEUTRAL");
  const [categoryState,setCategoryState] = useState("NEUTRAL");
  const [subCategoryState,setSubCategoryState] = useState("NEUTRAL");
  const [descriptionState,setDescriptionState] = useState("NEUTRAL");
  const [editorFocused,setEditorFocused] = useState(false);

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryReducer.categoryList);
  
  useEffect(() => {
    const index = getIndex(category,categoryList,"typeName");
    setCategoryIndex(index);
  }, [category]);

  useEffect(() => {
    const raw =  convertToRaw(editorState.getCurrentContent())
    const rawString = JSON.stringify(raw);
    var res  = rawString.replace(/"/g, "\"")
    setText(res);
    
  }, [editorState]);

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
    categoryList.map((item) => (
      { value: item.typeName, label: item.typeName}
    ));

    const subCategoryOption =
    categoryList.length > 0 && categoryIndex > -1 &&
    categoryList[categoryIndex].subCategoryList.map((item) => (
      { value: item.name, label: item.name }
    ));
      
  
    const onFocusTitle = (event) => {
      
      setTitleState("ACTIVE")
    };
    const onBlurTitle = (event) => {
      if(title.length > 0){
        setTitleState("CORRECT")
      }
      else{
        setTitleState("NEUTRAL")
      }
      
    }

    const onFocusCategory = (event) => {
      
      setCategoryState("ACTIVE")
    };
    const onBlurCategory = (event) => {
      if(category.length > 0){
        setCategoryState("CORRECT")
      }
      else{
        setCategoryState("NEUTRAL")
      }
      
    }

    const onFocusSubCategory = (event) => {
      
      setSubCategoryState("ACTIVE")
    };
    const onblurSubCategory = (event) => {
      if(subCategory.length > 0){
        setSubCategoryState("CORRECT")
      }
      else{
        setSubCategoryState("NEUTRAL")
      }
      
    }

    const onFocusEditor = (event) => {
      
      setDescriptionState("ACTIVE")
      setEditorFocused(true);
    };
    const onblurEditor = (event) => {
      if(text.length > 132){
        setDescriptionState("CORRECT")
      }
      else{
        setDescriptionState("NEUTRAL")
      }
      setEditorFocused(false);
      
    }

    


  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeCategory = (event) => {
    setCategory(event.value);
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
      <components.Option className="selectCheckboxWrapper" {...props}>
        <input className="selectCheckbox" type="checkbox"
        checked={props.isSelected}
        onChange ={e=> null}/>
        <label>{props.value}</label>
      </components.Option>
    </div>
    );
  }


  const style = {
    control: (base,state) => ({
      ...base,
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25);': 0,
      borderColor: state.isFocused
      ? '#80bdff'
      : base.borderColor,
    '&:hover': {
      borderColor: state.isFocused
        ? '#80bdff'
        : base.borderColor,
    }    
    }),
    option: (base,state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#5B7E9A' : '#ffffff',
      '&:active': {
        backgroundColor: state.isSelected ? '#292D48' : '#285273',
        color: state.isSelected ? 'white' : 'white',
      }
    })
  };
  
  return (
    <Row className="m-0 QuestionFormAndStepsWrapper">
              <Col xs={12} sm={4} className="questionFormStepsWrapper">
         <QuestionFormInfo titleState={titleState} categoryState={categoryState} subCategoryState={subCategoryState} descriptionState={descriptionState}/>
        </Col>
        <Col xs={12} sm={8} className="QuestionFormWrapper">
        <Form className="questionForm" onSubmit={handleSubmit}>
          
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className="questionFormHeader">Ställ en fråga</Form.Label>
            <Form.Control onFocus={onFocusTitle} onBlur={onBlurTitle} className="questionFormControl"
              type="text"
              placeholder="titel..."
              onChange={onChangeTitle}/>
          </Form.Group>

 
              <Select styles={style} onFocus={onFocusCategory} onBlur={onBlurCategory} className="questionSingleSelect react-select-container" classNamePrefix="react-select" placeholder="välj kategori..."  closeMenuOnSelect={false} hideSelectedOptions={false} isSearchable={false}  options={categoryOption} onChange={onChangeCategory} />

              <Select styles={style} onFocus={onFocusSubCategory} onBlur={onblurSubCategory} className="questionMultiSelect react-select-container" classNamePrefix="react-select" placeholder="välj taggar..."  isMulti closeMenuOnSelect={false} hideSelectedOptions={false} isSearchable={false} components={{Option}} options={subCategoryOption} onChange={onChangeSubCategory} />
          
          <Form.Group controlId="exampleForm.ControlTextarea1">
          <Editor
          onFocus={onFocusEditor}
          onBlur={onblurEditor}
           editorState={editorState}
           toolbarClassName=""
         wrapperClassName="textEditorWrapper"
         editorClassName={editorFocused ? "textEditorActive" : "textEditor"}
           onEditorStateChange={setEditorState}
           />
                </Form.Group>

                <Form.Group className="questionFormButtonWrapper">
            <Button className="questionFormButton" type="submit">
              fråga
            </Button>
         </Form.Group>
        </Form>
        </Col>
        </Row>
  );
};

export default QuestionForm;
