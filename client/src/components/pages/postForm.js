import React from "react";
import { Input } from "@material-ui/core";
import Form from "react-jsonschema-form";

class postForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jsonFile: null, formData: null };
  }
  handleFetch = state => {
    if (!state.jsonFile) {
      fetch(
        `http://localhost:3000/routes/api/admins/schema/${this.props.type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.props.token
          }
        }
      )
        .then(response => {
          response.json().then(data => {
            this.setState({ jsonFile: data.data });
          });
        })
        .catch(error => console.log(error.message));
    }
  };

  onSubmit = () => {
    fetch("http://localhost:3000/api/investors/create/company", {
      method: "POST",
      body: JSON.stringify(this.state.formData),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.props.token
      }
    }).then(response => {
      response.json().then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log("Successful" + data);
        }
      });
    });
  };
  handleInputs = e => {
    let value = e.target.value;
    let name = e.target.name;
    console.log(e);
    // console.log(this.state.investor)
    this.setState(
      prevState => {
        return {
          formData: {
            ...prevState.formData,
            [name]: value
          }
        };
      },
      () => console.log(this.state.formData)
    );
  };
  handleFile = state => {
    const onSubmit = ({formData}) => console.log("Data submitted: ",  formData);
    let yourForm;
    function validate(formData, errors) {
      if (formData.nameInArabic === "ss") {
        errors.nameInArabic.addError("Passwords don't match");
      }
      return errors;
    }

    if (state.jsonFile) {
      console.log(state.jsonFile);
      console.log(JSON.stringify(state.jsonFile));
      return (
        <Form
          onChange={this.handleInput}
          formData={this.state.formData}
          schema={state.jsonFile}
          validate={validate}
          OnSubmit={onSubmit} ref={(form) => {yourForm = form;}}
          />
          );
        }
        if(yourForm)
        yourForm.submit();
  };

  render() {
    return (
      <>
        {this.handleFetch(this.state)}
        {this.handleFile(this.state)}
      </>
    );
  }
}

export default postForm;
