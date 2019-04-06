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
import CaseCard from './components/cards/CaseCard'

class App extends Component {

constructor(props){
  super(props);
  this.state={
    test:[],
    lawyerCases:[],
companys:[],
isLoaded:false

  }

}

fetchCompanies(){
  fetch('http://localhost:3000/api/company')
  .then(res => res.json())
  .then(json =>{
    
    this.setState({
      isLoaded:true,
    
      companys:json
      
      
    })
    // console.log(this.state.companys)
    // const CC=this.state.companys
    // console.log(CC)
  
  
  })
  .catch(error => this.setState({ error, isLoading: false }));
}


fetchLawyerCases(){
  fetch('http://localhost:3000/api/lawyer/getall/cases',{
    headers: new Headers({
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTc2NzcwNjBmYjlhMzU3MDg1NDEzMSIsImlhdCI6MTU1NDQ3NDg2NCwiZXhwIjoxNTU0NTYxMjY0fQ.ohZaa1j6szCPY6ycIuiyc3kWL_aplpMEXv91Gcs4Oao'
     // i dont know how to get this token again once it expires right now but in later sprints it will be implemented when the logging in methods are finilazied
    })
  })
  .then(res=> res.json())
  .then(json=>{
    this.setState({
      lawyerCases:json
    })
    console.log(this.state.lawyerCases)
    
  })
}



//componentDidMount(){
//this.fetchCompanies()
//this.fetchLawyerCases()

//}



  render() {
 
  
    return (
      <Router>
      <React.Fragment>
    <Navbar/>
    <Route exact path="/register" render={props => (
               <Register/>
            )} />
    <Route exact path="/admin/register-lawyer" render={props => (
               <RegisterLawyer/>
            )} />
    <Route exact path="/admin/register-reviewer" render={props => (
               <RegisterReviewer/>
            )} />
    <InvestorCompanyReg/>
      <div>
    <Signin/>,
    <Buttons ></Buttons>
    



   
    {/* <ul>
          {this.state.companys.map(item1 => (
            <li key={item1}>{item1}</li>
          ))}
        </ul> */}



<ul>
<li > 
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
