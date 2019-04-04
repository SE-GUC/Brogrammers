import React, { Component } from 'react';

import './App.css';
import Navbar from  './components/layout/Navbar';
import Buttons from './components/buttons/Button'
class App extends Component {

  state={
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
]

  }





  render() {

   
    return (
      <div>
<Navbar/>
<Buttons lawyers={this.state.lawyers}></Buttons>



      </div>
    

     
    );
  }
}

export default App;
