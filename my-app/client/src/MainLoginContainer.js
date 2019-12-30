import React, { Component } from 'react';
import Login from './Login/Login'
import Main from './Main/Main'
import { connect } from 'react-redux';
import logo from './logo.svg';
import store from './Redux/store';
import './App.css';

class MainLoginContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedin: false,
    };
    this.golfer = "";
    this.setLogin = this.setLogin.bind(this);
    this.setGolfer = this.setGolfer.bind(this);
  }




  setLogin(state){
    this.setState({
      isLoggedin: this.props.auth.isAuthenticated ? true : false
    });
  }

  setGolfer(golfer){
    this.golfer = this.props.auth.user
  }

  render(){

    console.log("this.props.auth.user: ", this.props.auth.user)
    console.log("this.props.auth.isAuthenticated: ", this.props.auth.isAuthenticated);
    console.log("this.golfer: ", this.golfer);
    console.log("isLoggedin: ", this.state.isLoggedin);

    if(this.props.auth.isAuthenticated  == true){
      return (
        <div>
          <Main golfer={this.props.auth.user}/>
        </div>
      );
    }
    else{
      return (
        <div>
          <Login /* setLogin={this.setLogin} setGolfer={this.setGolfer}*//>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(MainLoginContainer);
