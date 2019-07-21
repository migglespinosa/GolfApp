import React, { Component } from 'react';
import Login from './Login/Login'
import Main from './Main/Main'
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedin: false,
      golfer: null,
    };
    this.setLogin = this.setLogin.bind(this);
    this.setGolfer = this.setGolfer.bind(this);
  }

  setLogin(state){
    this.setState({
      isLoggedin: state
    });
  }

  setGolfer(golfer){
    console.log("Golfer Set")
    this.setState({
      golfer: golfer
    })
  }

  render(){

    if(this.state.isLoggedin == true){
      return (
        <div>
          <Main golfer={this.state.golfer}/>
        </div>
      );
    }
    else{
      return (
        <div>
          <Login setLogin={this.setLogin} setGolfer={this.setGolfer}/>
        </div>
      );
    }
  }
}

export default App;
