import React, { Component } from 'react';
import Required from  '../layout/inputs/Required';
import Country from  '../layout/inputs/Country'
class Register extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
    <React.Fragment>
        <Required field={'Full Name'} type='text'/>
        <Required field={'Email'} type='email'/>
        <Required field={'Password'} type='password'/>
        <Required field={'name'} type='email'/>
        <Country/>
    </React.Fragment>
    );
  }
}

export default Register;
