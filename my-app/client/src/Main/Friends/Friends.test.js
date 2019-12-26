import React from 'react';
import ReactDOM from 'react-dom';
import Friends from './Friends';
import { configure, shallow, mount } from 'enzyme';

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

describe('Tests for </Friends>', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Friends golfer={golfer}/>)
  })

  it("Lists all of the golfer's friends", () => {
    expect(wrapper.find('#friendsList').children()).toHaveLength(2);
  })

})
