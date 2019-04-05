import React, { Component } from 'react';

import './App.css';
import Navbar from  './components/layout/Navbar';
import Register from  './components/pages/Register';
import 'typeface-roboto';
import Input from  './components/layout/inputs/Input';

class App extends Component {
  render() {
    return (
      <React.Fragment>
    <Navbar/>
    <Register/>
     </React.Fragment>
    );
  }
}

export default App;
