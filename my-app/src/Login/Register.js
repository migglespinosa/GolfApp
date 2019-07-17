import React, { Component } from 'react';
import Login from './Login';

class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      Username: null,
      Password: null,
      FirstName: null,
      LastName: null
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  addUser(event){
    console.log("addUser executed")
    const newGolfer = {
      Username: this.state.Username,
      Password: this.state.Password,
      First_Name: this.state.FirstName,
      Last_Name: this.state.LastName
    }
    this.props.append(newGolfer);
    event.preventDefault();
    console.log(this.props.data)
  }

  handleUsernameChange(event){
    console.log("Username Changed")
    this.setState({Username: event.target.value});
  }

  handlePasswordChange(event){
    console.log("Password Changed")
    this.setState({Password: event.target.value});
  }

  handleFirstNameChange(event){
    console.log("FirstName Changed")
    this.setState({FirstName: event.target.value});
  }

  handleLastNameChange(event){
    console.log("LastName Changed")
    this.setState({LastName: event.target.value});
  }

  render(){
    return(
      <div>
        <h1>Register Page</h1>
          <form onSubmit={this.addUser}>
            <label>
              Your Username:
              <input type="text" id="Username"
              value={this.state.Username || ''}
              onChange={this.handleUsernameChange}/>
            </label> <br />
            <label>
              Your Password:
              <input type="text" id="Password"
              value={this.state.Password || ''}
              onChange={this.handlePasswordChange}/> <br />
            </label> <br />
            <label>
              Your First Name:
              <input type="text" id="FirstName"
              value={this.state.FirstName || ''}
              onChange={this.handleFirstNameChange}/> <br />
            </label>  <br />
            <label>
              Your Last Name:
            </label>
              <input type="text" id="LastName"
              value={this.state.LastName || ''}
              onChange={this.handleLastNameChange}/> <br />
            <input type="submit" value="Create User" />
          </form>
        <button type="button" id="LoginReturnButton" onClick={e => this.props.setRegister(e)}>
          Login
        </button>
      </div>
    )
  }
}


export default Register;
