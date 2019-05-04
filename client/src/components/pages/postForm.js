import React from "react";
import { Input } from "@material-ui/core";
import Form from "react-jsonschema-form";
import Snackbar from "../layout/snackbar/Snackbar";

class postForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonFile: null,
      formData: null,
      uiSchema: {},
      Successful: false
    };
  }
  handleFetch = state => {
    if (!state.jsonFile) {
      fetch(
        `https://serverbrogrammers.herokuapp.com/routes/api/admins/schema/${
          this.props.type
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": sessionStorage.getItem("jwtToken")
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
    const bod = JSON.stringify({
      ...this.state.formData,
      legalCompanyForm: this.props.type
    });
    if (sessionStorage.getItem("type") === "i")
      fetch(
        "https://serverbrogrammers.herokuapp.com/api/investors/create/company",
        {
          method: "POST",
          body: bod,
          headers: {
            "Content-Type": "application/json",
            "x-access-token": sessionStorage.getItem("jwtToken")
          }
        }
      ).then(response => {
        response.json().then(data => {
          console.log("Successful" + data);
          this.setState({ Successful: true });
        });
      });
    if (sessionStorage.getItem("type") === "l")
      fetch(
        "https://serverbrogrammers.herokuapp.com/api/lawyer/create/company",
        {
          method: "POST",
          body: bod,
          headers: {
            "Content-Type": "application/json",
            "x-access-token": sessionStorage.getItem("jwtToken")
          }
        }
      ).then(response => {
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
      return errors;
    }

    if (state.jsonFile) {
     
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
    if (this.state.Successful) {

      return <Snackbar variant="success" message={"Success"} />;
    }
    return (
      <>
        {this.handleFetch(this.state)}
        {this.handleFile(this.state)}
      </>
    );
  }
}

export default postForm;
