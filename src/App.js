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
import InvestorCompanyReg from './components/pages/InvestorCompanyReg'


class App extends Component {

constructor(props){
  super(props);
  this.state={
    test:[],
    lawyers:
    [
    {
      lawyerId:"5ca651d277a5e6239428b626"
    }
  ],
companys:
[
  {
    companyId:"5ca6558c77a5e6239428b62d"
  }
],
isLoaded:false

  }

}


componentDidMount(){
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(json =>{
    this.setState({
      isLoaded:true,
      test:json
    })
  })
}






  render() {

   var {isLoaded,test}=this.state

   if(!isLoaded){
     return <div>Loading...</div>;
   }
else{
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
    <Buttons lawyers={this.state.lawyers}></Buttons>
   <ul>

     {test.map(hi=>(
<li key={hi.id}>
{
 hi.name 
}
</li>
     ))};
     </ul>
      </div>
      </React.Fragment>
      </Router>
    );
  }
}
}

export default App;
