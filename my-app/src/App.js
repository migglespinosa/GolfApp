import React, { Component } from 'react';
import Calculate from './Calculate/Calculate';
import FriendRequests from './FriendRequests/FriendRequests';
import Friends from './Friends/Friends';
import HandicapProgress from './HandicapProgress/HandicapProgress';
import Map from './Map/Map';
import Score from './Score/Score';
import SearchCourses from './SearchCourses/SearchCourses';
import SearchRanges from './SearchRanges/SearchRanges';
import SearchShops from './SearchShops/SearchShops';
import SetAppointments from './SetAppointments/SetAppointments';
import UpcomingAppointments from './UpcomingAppointments/UpcomingAppointments';
import Buttons from './Buttons';
import Login from './Login/Login'
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedin: false,
      display: null
    };
    this.setComponent = this.setComponent.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }

  setComponent(componentToBeSet){
    this.setState({
      display: componentToBeSet
    });
  }

  setLogin(state){
    this.setState({
      isLoggedin: state
    });
  }

  render(){

    let body;
    if(this.state.display == null){
      body = <p>Null</p>
    }
    else if(this.state.display == "Calculate"){
      body = <Calculate/>
    }
    else if(this.state.display == "FriendRequests"){
      body = <FriendRequests/>
    }
    else if(this.state.display == "Friends"){
      body = <Friends/>
    }
    else if(this.state.display == "HandicapProgress"){
      body = <HandicapProgress/>
    }
    else if(this.state.display == "Map"){
      body = <Map/>
    }
    else if(this.state.display == "Score"){
      body = <Score/>
    }
    else if(this.state.display == "SearchCourses"){
      body = <SearchCourses/>
    }
    else if(this.state.display == "SearchRanges"){
      body = <SearchRanges/>
    }
    else if(this.state.display == "SearchShops"){
      body = <SearchShops/>
    }
    else if(this.state.display == "SetAppointments"){
      body = <SetAppointments/>
    }
    else if(this.state.display == "UpcomingAppointments"){
      body = <UpcomingAppointments/>
    }

    if(this.state.isLoggedin == true){
      return (
        <div>
          <Buttons setComponent={this.setComponent}/>
          {body}
        </div>
      );
    }
    else{
      return (
        <div>
          <Login setLogin={this.setLogin}/>
        </div>
      );
    }
  }
}

export default App;
