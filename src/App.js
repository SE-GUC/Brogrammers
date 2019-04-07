import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from  './components/layout/Navbar';
import Register from  './components/pages/Register';
import RegisterLawyer from  './components/pages/RegisterLawyer';
import RegisterReviewer from  './components/pages/RegisterReviewer';
import 'typeface-roboto';
import Input from  './components/layout/inputs/Input';
import Buttons from './components/buttons/Button'
import Signin from './components/signin/Signin'
import axios from 'axios';
import InvestorCompanyReg from './components/pages/InvestorCompanyReg'
import ReviewerCases from './components/pages/ReviewerCases'
import LawyerCases from './components/pages/LawyerCases'
import AdminCases from './components/pages/AdminCases'
class App extends Component {

constructor(props){
  super(props);
  this.state={
    test:[],
     lawyerCases:[],
companys:[],
isLoaded:false,
token:null,

  }
  this.setToken = this.setToken.bind(this);
}


setToken(t){
  this.setState({token:t})
  console.log(this.state.token)
}


  render() {
 
  
    return (
      <Router>
      <React.Fragment>
    <Navbar/>
    <Route exact path="/register" render={props => (
               <Register callBack={this.setToken}/>
            )} />
    <Route exact path="/admin/register-lawyer" render={props => (
               <RegisterLawyer callBack={this.setToken}/>
            )} />
    <Route exact path="/admin/register-reviewer" render={props => (
               <RegisterReviewer callBack={this.setToken}/>
            )} />
    <InvestorCompanyReg/>
  
      <div>
    <Signin/>,
    
    
    <Route exact path="/LawyerCases" render={props =>(
  <LawyerCases token={this.state.token}  />
  )}/>

<Route exact path="/ReviewerCases" render={props =>(
  <ReviewerCases token={this.state.token}  />
  )}/>

<Route exact path="/AdminCases" render={props =>(
  <AdminCases token={this.state.token}  />
  )}/>


      </div>
      </React.Fragment>
      </Router>
    );
  }
}

export default App;
