import React, { Component } from 'react';
import Register from './Register';
import logo from '../logo.svg';
import data from '../golfers.json'
import '../App.css';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      Username: null,
      Password: null,
      onRegister: false
    }
    this.setRegister = this.setRegister.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.appendData = this.appendData.bind(this);
    this.verify = this.verify.bind(this);
  }

  appendData(golfer){
    data.push(golfer)
  }

  verify(event){
    console.log("Login Attempted");
    const filteredArray = data.filter(golfer => {
      if(golfer.Username == this.state.Username && golfer.Password == this.state.Password){
        return golfer;
      }
    });
    if(filteredArray.length == 1){
      this.props.setGolfer(filteredArray[0])
      this.props.setLogin(true);
    }
    event.preventDefault();
  }

  setRegister(){
    this.setState(state => ({
      onRegister: !state.onRegister
    }));
  }

  handleUsernameChange(event){
    console.log("Username Changed")
    this.setState({Username: event.target.value});
  }

  handlePasswordChange(event){
    console.log("Password Changed")
    this.setState({Password: event.target.value});
  }

  render(){
    if(this.state.onRegister == false){
      return(
        <div>
          <h1> Login Page </h1>
          <form onSubmit={this.verify}>
            <label>
              Username:
              <input type="text" id="Username"
              value={this.state.Username || ''}
              onChange={this.handleUsernameChange}/>
            </label> <br />
              Password:
              <input type="text" id="Password"
              value={this.state.Password || ''}
              onChange={this.handlePasswordChange}/> <br />
            <input type="submit" value="Submit" />
          </form>
          <button type="button" id="RegisterButton" onClick={e => this.setRegister(e)}>Register</button>
        </div>
      )
    }
    else{
      return(
        <Register setRegister={this.setRegister} data={data} append={this.appendData}/>
      );
    }
  }
}

export default Login;
