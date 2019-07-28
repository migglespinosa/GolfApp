import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import UpcomingOutings from './UpcomingOutings';
import { configure, shallow, mount } from 'enzyme';

const golfer = {
  {
    Username: "Tiger",
    Password: "Tiger1234",
    First_Name: "Tiger",
    Last_Name: "Woods",
    Friends: [
      "Rory",
      "Brooks"
    ],
    Differntials: [
      {"Date": "2019-11-04T23:10:00.933Z",
       "Differntial": 70},
      {"Date": "2019-12-04T23:10:00.933Z",
      "Differntial": 68},
      {"Date": "2019-13-04T23:10:00.933Z",
       "Differntial": 67},
      {"Date": "2019-14-04T23:10:00.933Z",
      "Differntial": 70},
      {"Date": "2019-16-06T23:10:00.933Z",
      "Differntial": 69}
    ],
  Handicap: [
    {"Date": "2019-16-06T23:10:00.933Z",
    "Handicap": 69}
  ],
  Outings: [
    {Date: "2019-16-05T23:10:00.933Z",
    Location: "Augusta",
    Participants: ["Brooks"]},
    {Date: "2019-16-09T23:10:00.933Z",
    Location: "Augusta",
    Participants: ["Brooks", "Tiger", "Rory"]},
    {Date: "2019-16-10T23:10:00.933Z",
    Location: "Pebble Beach",
    Participants: ["Brooks", "Tiger", "Rory"]},
    {Date: "2019-16-11T23:10:00.933Z",
    Location: "Bethpage Black",
    Participants: ["Brooks", "Tiger"]}
    ]
  }
}

describe('Testing <UpcomingOutings/>', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<UpcomingOutings/>);
  });

  it("Lists all of the golfer's future outings"){
    expect(wrapper.find('#futureOutingsList').children()).toHaveLength(3);
  }

  it("Lists all of the golfer's past outings"){
    expect(wrapper.find('#pastOutingsList').children()).toHaveLength(1);
  }

})
