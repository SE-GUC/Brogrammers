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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      lawyerCases: [],
      companys: [],
      isLoaded: false,
      token: null
    };
    this.setToken = this.setToken.bind(this);
  }

  fetchCompanies() {
    fetch("http://localhost:3000/api/company")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,

          companys: json
        });
        // console.log(this.state.companys)
        // const CC=this.state.companys
        // console.log(CC)
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  //componentDidMount(){
  //this.fetchCompanies()
  //this.fetchLawyerCases()

  //}
  setToken(t) {
    this.setState({ token: t });
    console.log(this.state.token);
  }

  //}

  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/register" render={props => <Register />} />
          <Route
            exact
            path="/admin/register-lawyer"
            render={props => <RegisterLawyer />}
          />
          <Route
            exact
            path="/admin/register-reviewer"
            render={props => <RegisterReviewer />}
          />
          <Route
            exact
            path="/editprofile/investor"
            render={props => <EditProfileInvestor token={this.state.token} />}
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
            path="/editprofile/reviewer"
            render={props => <EditProfileReviewer />}
          />
          <InvestorCompanyReg />
          <div>
            <Signin />,<Buttons />
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
