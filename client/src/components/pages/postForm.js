import React from "react";
import { Input } from "@material-ui/core";
import Form from "react-jsonschema-form";

class postForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { jsonFile: null, formData: null,uiSchema:{
      
    } };
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

    const bod=JSON.stringify({...this.state.formData,LegalCompanyForm:this.props.type});
    fetch("http://localhost:3000/api/investors/create/company", {
      method: "POST",
      body: bod,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.props.token
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      });
    });
  };
  handleInputs = e => {
    let value = e.formData.value;
    let name = e.formData.name;
    console.log(e.formData);
    // console.log(this.state.investor)
    this.setState(
      pervState => {
        return {
          formData: {
            ...e.formData,
            [name]: value
          }
        };
      },
      () => console.log(this.state.formData)
    );
  };
  handleFile = state => {
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
          onChange={this.handleInputs}
          formData={this.state.formData}
          schema={state.jsonFile}
          validate={validate}
          onSubmit={this.onSubmit}
          uiSchema={this.state.uiSchema}
        />
      );
    }
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
