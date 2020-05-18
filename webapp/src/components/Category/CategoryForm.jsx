import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileImage: null,
      profileImagePreview: null
    };

    this.handleFileChange = this.handleFileChange.bind(this);

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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJGbGFrYW4iLCJleHAiOjE1ODk3NTkyODEsInVzZXIiOnsiaWQiOjQsInVzZXJuYW1lIjoiRmxha2FuIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6Im1lbWJlciJ9XX0sImlhdCI6MTU4OTcyMzI4MX0.o9U-OFDskMXPQdZAgjlJ85ZD7TTU5CaksvqOrrhtGgw',
          'Content-Type': 'multipart/form-data'}}).then(response => console.log(response.data)
          )
    }

  
  render() {

    return (
      <div>
 

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
