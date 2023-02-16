import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  name='sandy'
  render() {
    return (
      <div>
        Hi {this.name}
        <Navbar></Navbar>
        <News pageSize="5" country="in" category="sports"></News>
      </div>
    )
  }
}
