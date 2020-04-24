import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typename: "",
      username:"",
      profileImage: null,
      profileImagePreview: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

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

    handleFileChange = event =>{
    
      this.setState({profileImagePreview: URL.createObjectURL(event.target.files[0]), profileImage : event.target.files[0]});
    }


    handleFileSubmit = event =>{
      event.preventDefault();
      const file = this.state.profileImage;
      const formdata = new FormData();
      formdata.append("multipartFile", file);
      const url = "http://localhost:4000";
      axios.post(url + "/upload", formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'}}).then(response => console.log(response.data)
          )
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

        <Form onSubmit={this.handleFileSubmit}>
          <Form.Group>
            <label htmlFor="getFile" className="btn btn-primary btn-outlined">add image</label>
            <Form.Control id="getFile" type="file" onChange={this.handleFileChange} style={{display:"none"}}/> 
          <div>
              {this.state.profileImagePreview !== null ? <img src={this.state.profileImagePreview} width="100" height="100"/>: ""}
          </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Image
          </Button>
        </Form>
      </div>
    );
  }
}

export default CategoryForm;
