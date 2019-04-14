import React from 'react'
import { Input } from '@material-ui/core';
import Form from "react-jsonschema-form";

class postForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jsonFile:null }
    }
    handleFetch=state=>{
        if(!state.jsonFile){
          fetch(`http://localhost:3000/routes/api/admins/schema/${this.props.type}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": this.props.token
              }
              
            })
              .then(response => {
                response.json().then(data => {
                  this.setState({ jsonFile: data.data });
               
                });
              })
              .catch(error => console.log(error.message))
      }}
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
          } 
    
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