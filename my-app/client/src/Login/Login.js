import React, { Component } from 'react';
import Register from './Register';
import { connect } from 'react-redux';
import { loginGolfer } from '../Redux/actions/authActions';
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
    this.verify = this.verify.bind(this);
    this.setRegister = this.setRegister.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  verify(event){

    const golfer = {
      username: this.state.Username,
      password: this.state.Password
    }
    this.props.loginGolfer(golfer);
    event.preventDefault();
  }

  setRegister(){
    this.setState(state => ({
      onRegister: !state.onRegister
    }), console.log("onRegister: ", this.state.onRegister));
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
              <input type="text" id="UsernameLogin"
              value={this.state.Username || ''}
              onChange={this.handleUsernameChange}/>
            </label> <br />
              Password:
              <input type="text" id="PasswordLogin"
              value={this.state.Password || ''}
              onChange={this.handlePasswordChange}/> <br />
            <input type="submit" id="SubmitLogin" value="Submit" />
          </form>
          <button type="button" id="RegisterButton" onClick={e => this.setRegister(e)}>Register</button>
        </div>
      )
    }
    else{
      return(
        <Register setRegister={this.setRegister}/>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginGolfer }
)(Login);
