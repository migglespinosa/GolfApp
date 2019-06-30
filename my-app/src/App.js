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
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      display: null
    };
  }

  render(){

    var components = ["Calculate", "FriendRequests", "Friends",
                      "HandicapProgress", "Map", "Score", "SearchCourses",
                      "SearchRanges", "SearchShops", "SetAppointments",
                      "UpcomingAppointments"];

    var listOfButtons = [];
    var i;
    for(i = 1; i <= components.length; i++){
      listOfButtons.push(<button type="button">{components[i]}</button>)
    }

    return (
      <div className="App">
        {listOfButtons}
        <div className="Golf">
          This is a golf app.
          <Calculate/>
          <FriendRequests/>
          <Friends/>
          <HandicapProgress/>
          <Map/>
          <Score/>
          <SearchCourses/>
          <SearchRanges/>
          <SearchShops/>
          <SetAppointments/>
          <UpcomingAppointments/>
        </div>
      </div>
    );
  }
}

export default App;
