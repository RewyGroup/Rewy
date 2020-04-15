import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typename: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
    handleSubmit = event =>{
        const url = "http://localhost:4000";
        const postbody = {type_name: this.state.typename};
        axios.post(url + "/category",postbody);
        event.preventDefault();
        console.log("submitted");
        
}
    handleChange = event =>{
        const value = event.target.value;
        this.setState({typename : value});
    }


  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Create Category</Form.Label>
            <Form.Control onChange={this.handleChange} placeholder="Category"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CategoryForm;
