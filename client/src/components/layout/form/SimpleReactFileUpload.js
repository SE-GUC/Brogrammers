import React from "react";
import Button from "@material-ui/core/Button";
import Form from "react-jsonschema-form";

import axios from "axios";

import TextField from '@material-ui/core/TextField';
import { Input, Paper } from "@material-ui/core";

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploaded: false,
      submitted: false,
      jsonFile: null
    };
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(event.target.files[0]);
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("myFile", this.state.selectedFile);
    axios
      .post("http://localhost:3000/routes/api/admins/uploadfile", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
        this.setState({ uploaded: true, submitted: false , jsonFile: res.data.data});
      });
  };
  onSubmitHandler = () => {
    const data = new FormData();
    data.append("myFile", this.state.selectedFile);
    axios
      .post("http://localhost:3000/routes/api/admins/submit-form", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status

        this.setState({ submitted: true });
      });
  };
  handleDisplay = state => {
    return state.uploaded && !state.submitted ? (
      <Button onClick={this.onSubmitHandler}>Submit</Button>
    ) : (
      console.log("s")
    );
  };
  
  handleFile = state => {
    const MyCustomWidget = (props) => {
      return (
        <Input type="text"
          className="custom"
          value={props.value}
          required={props.required}
          onChange={(event) => props.onChange(event.target.value)} />
      );
    };
    
    const widgets = {
      myCustomWidget: MyCustomWidget
    };
    
    const uiSchema = {
      "ui:widget": "myCustomWidget"
    }
    
    
    
    if (state.jsonFile) {
      return (
      <Form
        schema={state.jsonFile}
        uiSchema={uiSchema}
        widgets={widgets} />
      )
    }
  };

  render() {
    return (
      <><Paper style={{height:1000}}>        <input type="file" name="myfile" onChange={this.onChangeHandler} />
        <Button onClick={this.onClickHandler}>Upload</Button>
        {this.handleDisplay(this.state)}
        {this.handleFile(this.state)}
        </Paper>

      </>
    );
  }
}

export default SimpleReactFileUpload;
