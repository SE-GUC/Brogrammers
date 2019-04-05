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
    lawyers: [],
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
    console.log(this.state.companys)
    const CC=this.state.companys
    console.log(CC)
  
  
  })
  .catch(error => this.setState({ error, isLoading: false }));
}


fetchLawyers(){
  fetch('http://localhost:3000/api/lawyer',{
    headers: new Headers({
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTY0ZjE3NzdhNWU2MjM5NDI4YjYyNSIsImlhdCI6MTU1NDQwMzA5NSwiZXhwIjoxNTU0NDg5NDk1fQ.1gjeXMxaEcrHUbqoIb0Q8e0-a-KN9E9UDwb9U0qGKqg'
     // i dont know how to get this token again once it expires right now but in later sprints it will be implemented when the logging in method changes
    })
  })
  .then(res=> res.json())
  .then(json=>{
    this.setState({
      lawyers:json
    })
    console.log(this.state.lawyers)
    
  })
}



componentDidMount(){
this.fetchCompanies()
this.fetchLawyers()

}

// getDemLawyers(){
//   fetch('http://localhost:3000/api/lawyer')
//   .then(res => res.json)
//   .then(law =>{
//     this.setState({
//       isLoaded:true,
//       test:law
//     })
//   })
// }

//  getLawyers =async()=> {
  
//   const api_call= await fetch('https://jsonplaceholder.typicode.com/users');
//   const data=await api_call.json();
//   console.log(data)
// }

// let companys=this.state.companys.map((company)=>{
//   console.log("hi")
//    })


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
    <Buttons ></Buttons>
    
   
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
     
    );
  }
}
}

export default App;
