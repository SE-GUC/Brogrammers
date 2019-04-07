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
import Signin from "./components/signin/Signin";
import axios from "axios";
import InvestorCompanyReg from "./components/pages/InvestorCompanyReg";
import CaseCard from "./components/cards/CaseCard";
import EditProfileInvestor from "./components/pages/EditProfileInvestor";
import EditProfileAdmin from "./components/pages/EditProfileAdmin";
import EditProfileLawyer from "./components/pages/EditProfileLawyer";
import EditProfileReviewer from "./components/pages/EditProfileReviewer";
import InvestorRequests from "./components/pages/InvestorRequests";

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
    <Route exact path="/register" render={props => (
               <Register callBack={this.setToken}/>
            )} />

    <Route exact path="/admin/register-lawyer" component={()=>sessionStorage.getItem('auth')? <RegisterLawyer callBack={this.setToken}/> : <Signin/>} />
    <Route exact path="/admin/register-reviewer" component={()=>sessionStorage.getItem('auth')?<RegisterReviewer callBack={this.setToken}/> : <Signin/>} />
    <Route exact path="/admin/register-admin" render={props => (
               <RegisterReviewer callBack={this.setToken}/>
            )} />
    <InvestorCompanyReg/>
      <div>
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