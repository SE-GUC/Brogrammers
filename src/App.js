import React, { Component } from 'react';

import './App.css';
import Navbar from  './components/layout/Navbar';
import Register from  './components/pages/Register';
import 'typeface-roboto';
import Input from  './components/layout/inputs/Input';
import Buttons from './components/buttons/Button'
import Signin from './components/signin/Signin'
import axios from 'axios';
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

getDemLawyers(){
  fetch('http://localhost:3000/api/lawyer')
  .then(res => res.json)
  .then(law =>{
    this.setState({
      isLoaded:true,
      test:law
    })
  })
}

 getLawyers =async()=> {
  
  const api_call= await fetch('https://jsonplaceholder.typicode.com/users');
  const data=await api_call.json();
  console.log(data)
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
    
      <div>
    <Signin/>,
    <Buttons getLawyers={this.getLawyers}  ></Buttons>
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
