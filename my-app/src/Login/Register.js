import React, { Component } from 'react';
import Login from './Login';

class Register extends Component{
  constructor(props){
    super(props);

  }

  testFunction(){

  }

  render(){
    return(
      <div>
        <h1>Register Page</h1>
        <button type="button" id="RegisterButton" onClick={e => this.props.setRegister(e)}>
          Login
        </button>
      </div>
    )
  }
}


export default Register;
