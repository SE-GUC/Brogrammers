import React, { Component } from 'react';

import './App.css';
import Navbar from  './components/layout/Navbar';
import Signin from './components/signin/Signin'

class App extends Component {
  render() {
    return (
    <Navbar/>,
    <Signin/>
     
    );
  }
}

export default App;
