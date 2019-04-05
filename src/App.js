import React, { Component } from 'react';

import './App.css';
import Navbar from  './components/layout/Navbar';
import Register from  './components/pages/Register';
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
      <React.Fragment>
    <Navbar/>
    <Register/>
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
     
    );
  }
}
}

export default App;
