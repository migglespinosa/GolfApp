import React from 'react';
import Buttons from './Buttons';
import ReactDOM from 'react-dom';
import App from '../App';
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
import { configure, shallow, mount } from 'enzyme';
import Main from './Main'

const golfer = {
  Username: "Rory",
  Password: "Rory1234",
  First_Name: "Rory",
  Last_Name: "McIlroy",
  Friends: [
    "Tiger",
    "Brooks"
  ],
  Differntials: [
    {"Date": "2019-11-04T23:10:00.933Z",
     "Differntial": 73},
    {"Date": "2019-12-04T23:10:00.933Z",
    "Differntial": 71},
    {"Date": "2019-13-04T23:10:00.933Z",
     "Differntial": 71},
    {"Date": "2019-14-04T23:10:00.933Z",
    "Differntial": 68},
    {"Date": "2019-19-05T23:10:00.933Z",
    "Differntial": 69}
  ],
  Handicap: [
    {"Date": "2019-16-05T23:10:00.933Z",
    "Handicap": 70.4}
  ]
}

describe('<Main/>', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Main golfer={golfer}/>);
  });

  it('<Buttons/> exists', () => {
    expect(wrapper.find(Buttons).exists()).toEqual(true);
  })


  it("Clicking the Calculate button sets display to 'Calculate'", () => {
    expect(wrapper.find('.Calculate').first().exists()).toEqual(true);
    const CalculateWrapper = wrapper.find('.Calculate').first();
    CalculateWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('Calculate');
  })

  it("Clicking the Score button sets display to 'Score'", () => {
    expect(wrapper.find('.Score').first().exists()).toEqual(true);
    const ScoreWrapper = wrapper.find('.Score').first();
    ScoreWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('Score');
  })

  it("Clicking the Map button sets display to 'Map'", () => {
    expect(wrapper.find('.Map').first().exists()).toEqual(true);
    const MapWrapper = wrapper.find('.Map').first();
    MapWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('Map');
  })

  it("Clicking the Friends button sets display to 'Friends'", () => {
    expect(wrapper.find('.Friends').first().exists()).toEqual(true);
    const FriendsWrapper = wrapper.find('.Friends').first();
    FriendsWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('Friends');
  })

  it("Clicking the Friend Request button sets display to 'Friend Request'", () => {
    expect(wrapper.find('.FriendRequests').first().exists()).toEqual(true);
    const FRWrapper = wrapper.find('.FriendRequests').first();
    FRWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('FriendRequests');
  })

  it("Clicking the SetAppointments button sets display to 'SetAppointments'", () => {
    expect(wrapper.find('.SetAppointments').first().exists()).toEqual(true);
    const SAWrapper = wrapper.find('.SetAppointments').first();
    SAWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('SetAppointments');
  })

  it("Clicking the UpcomingAppointments button sets display to 'UpcomingAppointments'", () => {
    expect(wrapper.find('.UpcomingAppointments').first().exists()).toEqual(true);
    const UAWrapper = wrapper.find('.UpcomingAppointments').first();
    UAWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('UpcomingAppointments');
  })

  it("Clicking the HandicapProgress button sets display to 'HandicapProgress'", () => {
    expect(wrapper.find('.HandicapProgress').first().exists()).toEqual(true);
    const HPWrapper = wrapper.find('.HandicapProgress').first();
    HPWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('HandicapProgress');
  })

  it("Clicking the SearchCourses button sets display to 'SearchCourses'", () => {
    expect(wrapper.find('.SearchCourses').first().exists()).toEqual(true);
    const HPWrapper = wrapper.find('.SearchCourses').first();
    HPWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('SearchCourses');
  })

  it("Clicking the SearchRanges button sets display to 'SearchRanges'", () => {
    expect(wrapper.find('.SearchRanges').first().exists()).toEqual(true);
    const SRWrapper = wrapper.find('.SearchRanges').first();
    SRWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('SearchRanges');
  })

  it("Clicking the SearchShops button sets display to 'SearchShops'", () => {
    expect(wrapper.find('.SearchShops').first().exists()).toEqual(true);
    const SRWrapper = wrapper.find('.SearchShops').first();
    SRWrapper.simulate('click');
    expect(wrapper.state('display')).toEqual('SearchShops');
  })
});
