import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { connect } from "react-redux";
import { registerGolfer } from "../Redux/actions/authActions";

class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      RegisterError: false,
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
    const newGolfer = {
      username: this.state.Username,
      password: this.state.Password,
      first_name: this.state.FirstName,
      last_name: this.state.LastName,
      friends: "",
      differntials: "",
      handicap: "",
      outings: "",
      pendingOutings: "",
      confirmedOutings: "",
      sentRequests: "",
      receivedRequests: ""
    }

    this.props.registerGolfer(newGolfer).then(res => {


      if(res.err){
        if(res.err.username === "Username must be at least 3 characters" &&
           res.err.password === "Password must be at least 3 characters"){
             this.setState({
               RegisterError: "UsernamePasswordLength"
             })
        }
        else if(res.err.username === "Username must be at least 3 characters"){
          this.setState({
            RegisterError: "UsernameLength"
          })
        }
        else if(res.err.password === "Password must be at least 3 characters"){
          this.setState({
            RegisterError: "PasswordLength"
          })
        }
      }
      else if(res.username === "User already exists"){
        this.setState({
          RegisterError: "UsernameTaken"
        })
      }
      else{
        this.setState({
          RegisterError: "None"
        })
      }
    })
    //const result = this.props.append(newGolfer);
    event.preventDefault();
  }

  handleUsernameChange(event){
    this.setState({Username: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({Password: event.target.value});
  }

  handleFirstNameChange(event){
    this.setState({FirstName: event.target.value});
  }

  handleLastNameChange(event){
    this.setState({LastName: event.target.value});
  }

  render(){

    let RegisterMessage;
    if(this.state.RegisterError === false){
      RegisterMessage = null
    }
    else if(this.state.RegisterError === "UsernameLength"){
      RegisterMessage = <h4>Username must be greater than 3 characters</h4>
    }
    else if(this.state.RegisterError === "PasswordLength"){
      RegisterMessage = <h4>Username must be greater than 3 characters</h4>
    }
    else if(this.state.RegisterError === "UsernameTaken"){
      RegisterMessage = <h4>Username has been taken</h4>
    }
    else if(this.state.RegisterError === "UsernamePasswordLength"){
      RegisterMessage = <h4>Username and Password must be greater than 3 characters</h4>
    }
    else if(this.state.RegisterError === "None"){
      RegisterMessage = <h4>User Created!</h4>
    }

    return(
        <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <div>
                <h1>Virtual Caddy</h1>
              </div>
              <div>
                {RegisterMessage}
                <form onSubmit={this.addUser}>
                  <label>
                    Your Username:
                    <input type="text" id="Username"
                    value={this.state.Username || ''}
                    onChange={this.handleUsernameChange}
                    required/>
                  </label> <br />
                  <label>
                    Your Password:
                    <input type="text" id="Password"
                    value={this.state.Password || ''}
                    onChange={this.handlePasswordChange}
                    required/> <br />
                  </label> <br />
                  <label>
                    Your First Name:
                    <input type="text" id="FirstName"
                    value={this.state.FirstName || ''}
                    onChange={this.handleFirstNameChange}
                    required/> <br />
                  </label>  <br />
                  <label>
                    Your Last Name:
                  </label>
                    <input type="text" id="LastName"
                    value={this.state.LastName || ''}
                    onChange={this.handleLastNameChange}
                    required/> <br />
                  <input type="submit" value="Create User" />
                </form>
              <button type="button" id="LoginReturnButton" onClick={e => this.props.setRegister(e)}>
                Login
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerGolfer }
)(Register);
