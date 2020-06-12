import React, {useState} from 'react';
import { Row,Col } from 'react-bootstrap';
import './QuestionFormInfo.css'
import { useEffect } from 'react';
import {SvgNumberPicker} from '../../utils/SvgNumberPicker';

const QuestionFormInfo = (props) => {
  const{titleState,categoryState,subCategoryState,descriptionState} = props;
   
  const times = ["titel","kategori","taggar","beskrivning"];
  const [steps,setSteps] = useState();

  const [state,setState]=useState({options:[
    {
      state: "NEUTRAL",
      type: "titel"

    }, 
    {
      state: "NEUTRAL",
      type: "kategori"

    }, 
    {
      state: "NEUTRAL",
      type: "taggar"

    }, 
    {
      state: "NEUTRAL",
      type: "beskrivning"

    }
  ] 
});

  useEffect(() => {
    const copy = state;
    switch (titleState) {
      case "ACTIVE":
        copy.options[0].state = "ACTIVE";
        setState(copy);
        break;
      case "CORRECT":
        copy.options[0].state = "CORRECT";
        setState(copy);
        break;
      default:
        copy.options[0].state = "NEUTRAL";
        setState(copy);
        break;
    }
    buildContent();
  }, [titleState]);


  useEffect(() => {
    const copy = state;
    switch (categoryState) {
      case "ACTIVE":
        copy.options[1].state = "ACTIVE";
        setState(copy);
        break;
      case "CORRECT":
        copy.options[1].state = "CORRECT";
        setState(copy);
        break;
      default:
        copy.options[1].state = "NEUTRAL";
        setState(copy);
        break;
    }
    buildContent();
  }, [categoryState]);

  useEffect(() => {
    const copy = state;
    switch (subCategoryState) {
      case "ACTIVE":
        copy.options[2].state = "ACTIVE";
        setState(copy);
        break;
      case "CORRECT":
        copy.options[2].state = "CORRECT";
        setState(copy);
        break;
      default:
        copy.options[2].state = "NEUTRAL";
        setState(copy);
        break;
    }
    buildContent();
  }, [subCategoryState]);

  useEffect(() => {
    const copy = state;
    switch (descriptionState) {
      case "ACTIVE":
        copy.options[3].state = "ACTIVE";
        setState(copy);
        break;
      case "CORRECT":
        copy.options[3].state = "CORRECT";
        setState(copy);
        break;
      default:
        copy.options[3].state = "NEUTRAL";
        setState(copy);
        break;
    }
    buildContent();
  }, [descriptionState]);










  function buildContent(){
  const content = times.length &&
  times.map((type,index)=>(  <Row value={index} key={index} className="m-0 questionFormStepsRow">
  <Col xs={4} className="questionFormStepsIconWrapper">
  {svgPicker(index)}
  </Col>
  <Col xs={8} className="questionFormStepsTextWrapper">
    {textPicker(type,index)}
  </Col>
  </Row>)) 

  setSteps(content);
}

  

function textPicker(type,index){


  switch(state.options[index].state){
    case "ACTIVE":
        return <span className="questionFormStepsTextActive">{[type]}</span>;
        break;
    case "CORRECT":
        return <span className="questionFormStepsTextCorrect">{[type]}</span>;
        break;       
    default:
        return <span className="questionFormStepsText">{[type]}</span>;
        break;
}

}

 function svgPicker(index){

  return SvgNumberPicker(state.options[index]);

 }

  

        return (

<div className="questionFormSteps">
<div>
{steps}
<Row className="m-0">
<Col className="questionFormStepsImgWrapper">
<img   className="questionFormStepsImg" src="/spaceship.png" alt="spaceship" />
</Col>
</Row>
</div>

</div>
        );
}

export default QuestionFormInfo;