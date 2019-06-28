import React from 'react';
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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

export default App;
