import React, { Component } from 'react';
import Register from './Register';
import {Container, Row, Col} from 'react-bootstrap';
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
      loginMessage: null,
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
    this.props.loginGolfer(golfer).then(res => {
      if(res.err.usernotfound == "User not found"){
        this.setState({
          loginMessage: "User not found"
        })
      }
      else if(res.err.passwordincorrect == "Password incorrect"){
        this.setState({
          loginMessage: "Password incorrect"
        })
      }
      else if(res.err.passwordincorrect == "Password incorrect" &&
              res.err.usernotfound == "User not found"){
        this.setState({
          loginMessage: "User not found"
        })
      }
    });
    event.preventDefault();
  }

  setRegister(){
    this.setState(state => ({
      onRegister: !state.onRegister
    }));
  }

  handleUsernameChange(event){
    this.setState({Username: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({Password: event.target.value});
  }

  render(){

    const loginMessage = <h4>{this.state.loginMessage}</h4>

    if(this.state.onRegister == false){
      return(
        <div>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
              <div>
                <h1 align="center">Virtual Caddy</h1>
              </div>
              <div>
                {loginMessage}
                <form onSubmit={this.verify}>
                  <label>
                    Username:
                    <input type="text" id="UsernameLogin"
                    value={this.state.Username || ''}
                    onChange={this.handleUsernameChange}
                    required/>
                  </label> <br />
                    Password:
                    <input type="text" id="PasswordLogin"
                    value={this.state.Password || ''}
                    onChange={this.handlePasswordChange}
                    required/> <br />
                  <div>
                    <input type="submit" id="SubmitLogin" value="Login" />
                    <button type="button" id="RegisterButton" onClick={e => this.setRegister(e)}>Register</button>
                  </div>
                </form>
              </div>
              </Col>
            </Row>
          </Container>
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
