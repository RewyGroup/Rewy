import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typename: "",
      username:""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount(){
    this.getUser();
}
    handleSubmit = event =>{
        const url = "http://localhost:4000";
        const postbody = {typeName: this.state.typename};
        axios.post(url + "/category",postbody);
        event.preventDefault();      
}
    handleChange = event =>{
        const value = event.target.value;
        this.setState({typename : value});
    }

    getUser(){
        const url = "http://localhost:4000";
        axios.get(url + "/user/1").then(response => this.setState({username:response.data.username}));
    }

  render() {
       
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>{this.state.username}</Form.Label>
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
