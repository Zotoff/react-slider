import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import styled from 'styled-components';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <div className="wrapper">
        <SayName name="Pavel" lastname="Petrov" link="test.com"/>
        <SayName name="Pavel" lastname="Petrov" link="test.com"/>
        <SayName name="Pavel" lastname="Petrov" link="test.com"/>
      </div>
    );
  }
}

function SayName(props){
  return (
      <div>
          <h1>Name: {props.name}, Surname: {props.lastname}</h1>
          <a href={props.link}>Link</a>
      </div>
  )
}

export default App;

