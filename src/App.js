import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Register from "./components/pages/Register";
import RegisterLawyer from "./components/pages/RegisterLawyer";
import RegisterReviewer from "./components/pages/RegisterReviewer";
import "typeface-roboto";
import Input from "./components/layout/inputs/Input";
import Buttons from "./components/buttons/Button";
import axios from "axios";
import InvestorCompanyRegSSC from "./components/pages/InvestorCompanyRegSSC";
import InvestorCompanyRegSPC from "./components/pages/InvestorCompanyRegSPC";
import CaseCard from "./components/cards/CaseCard";
import EditProfileInvestor from "./components/pages/EditProfileInvestor";
import EditProfileAdmin from "./components/pages/EditProfileAdmin";
import EditProfileLawyer from "./components/pages/EditProfileLawyer";
import EditProfileReviewer from "./components/pages/EditProfileReviewer";
import InvestorRequests from "./components/pages/InvestorRequests";
import LawyerComment from "./components/pages/LawyerComment";
import ReviewerComment from "./components/pages/ReviewerComment";
import AdminSignIn from './components/signin/AdminSignin';
import ReviewerSignIn from './components/signin/ReviewerSignIn';
import LawyerSignIn from './components/signin/LawyerSignIn';
import SignIn from './components/signin/Signin';
import ComplexButton from './components/layout/Complex Button/ComplexButton';

class App extends Component {

constructor(props){
  super(props);
  this.token=null;
  this.auth=null;
  this.state={
    test:[],
    lawyerCases:[],
companys:[],
isLoaded:false,
token:null,
auth:false,
type:'',

  }
}


  //componentDidMount(){
  //this.fetchCompanies()
  //this.fetchLawyerCases()

//}
setToken(t,a,type){
  this.setState({token:t , auth:a,type:type})
  sessionStorage.setItem('jwtToken', t);
  sessionStorage.setItem('auth', a);
  console.log(this.state.token+ " "+this.state.auth)
}

  //}

  render() {
 
    console.log(this.state.token+ " "+this.state.auth)
    return (
      <Router>
      <React.Fragment>
    <Navbar/>
    <Route exact path="/home" render={props => (
          <ComplexButton/>
    )} />
    <Route exact path="/register" render={props => (
               <Register callBack={this.setToken}/>
            )} />

    <Route exact path="/admin/register-lawyer" component={()=>sessionStorage.getItem('auth')? <RegisterLawyer callBack={this.setToken}/> : <LawyerSignIn/>} />
    <Route exact path="/admin/register-reviewer" component={()=>sessionStorage.getItem('auth')?<RegisterReviewer callBack={this.setToken}/> : <ReviewerSignIn/>} />
    <Route exact path="/admin/register-admin" render={props => (<RegisterReviewer callBack={this.setToken}/>)} />
           <Route
            exact
            path="/editprofile/investor"
            render={props => <EditProfileInvestor />}
          />
          <Route
            exact
            path="/editprofile/admin"
            render={props => <EditProfileAdmin />}
          />
          <Route
            exact
            path="/editprofile/lawyer"
            render={props => <EditProfileLawyer />}
          />
          <Route
            exact
            path="/addcomment/lawyer"
            render={props => <LawyerComment />}
          />
            <Route
            exact
            path="/addcomment/reviewer"
            render={props => <ReviewerComment />}
          />

          <Route
            exact
            path="/editprofile/reviewer"
            render={props => <EditProfileReviewer />}
          />
          <Route
            exact
            path="/investor/:id/MyRequests"
            render={props => <InvestorRequests/>}
          />
    <InvestorCompanyRegSSC/>
    <InvestorCompanyRegSPC/>

      <div>
    <Route exact path='/Investorlogin' render={props => (
          <SignIn/>
    )} />
    <Route exact path="/Lawyerlogin" render={props => (
          <LawyerSignIn callBack={this.setToken}/>
    )} />
    <Route exact path="/Reviewerlogin" render={props => (
          <ReviewerSignIn callBack={this.setToken}/>
    )} />
    <Route exact path="/Adminlogin" render={props => (
          <AdminSignIn callBack={this.setToken}/>
    )} />
    <Buttons ></Buttons>
    



   
    {/* <ul>
          {this.state.companys.map(item1 => (
            <li key={item1}>{item1}</li>
          ))}
        </ul> */}
            <ul>
              <li>
                <p>hihihihhi</p>
              </li>
              <li>
                <h1>Companies should be displayed here</h1>
              </li>
            </ul>
          </div>
        </React.Fragment>
      </Router>
    );
  }

}
export default App;
