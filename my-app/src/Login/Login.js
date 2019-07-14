import React, { Component } from 'react';
import Register from './Register';
import logo from '../logo.svg';
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
  }

  verify(){

  }

  setRegister(){
    this.setState(state => ({
      onRegister: !state.onRegister
    }));
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
              value={this.state.Username}/>
            </label> <br />
              Password:
              <input type="text" id="Password"
              value={this.state.Password}/> <br />
            <input type="submit" value="Submit" />
            <button type="button" id="RegisterButton" onClick={e => this.setRegister(e)}>Register</button>
          </form>
        </div>
      )
    }
    else{
      return(<Register setRegister={this.setRegister}/>);
    }
  }
}

export default Login;
