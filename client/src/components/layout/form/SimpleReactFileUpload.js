import React from "react";
import Button from "@material-ui/core/Button";
import Form from "react-jsonschema-form";
import ChooseType from "../../pages/ChooseType";
import Snackbar from "../snackbar/Snackbar";

import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { Input, Paper, MenuItem } from "@material-ui/core";

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploaded: false,
      submitted: false,
      jsonFile: null,
      companytypes: []
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
        this.setState({
          uploaded: true,
          submitted: false,
          jsonFile: res.data.data
        });
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

  onDeleteHandler = () => {
    const data = sessionStorage.getItem("type");
    console.log(data);
    fetch("http://localhost:3000/routes/api/admins/delete-form", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.props.token
      },
      body: 
        JSON.stringify( {formName: data})
      
    }).then(res => {
      console.log(res);

      return <Snackbar variant="error" message={res.data} />;
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
    const MyCustomWidget = props => {
      return (
        <Input
          type="text"
          className="custom"
          value={props.value}
          required={props.required}
          onChange={event => props.onChange(event.target.value)}
        />
      );
    };

    const widgets = {
      myCustomWidget: MyCustomWidget
    };

    const uiSchema = {
      "ui:widget": "myCustomWidget"
    };

    if (state.jsonFile) {
      return (
        <Form schema={state.jsonFile} uiSchema={uiSchema} widgets={widgets} />
      );
    }
  };

  render() {
    return (
      <>
        <div>
          <input type="file" name="myfile" onChange={this.onChangeHandler} />
          <Button onClick={this.onClickHandler}>Upload</Button>
          {this.handleDisplay(this.state)}
          {this.handleFile(this.state)}
        </div>
        <div>
          <Button onClick={this.onDeleteHandler}>Delete</Button>
          <ChooseType />
        </div>
      </>
    );
  }
}

export default SimpleReactFileUpload;
