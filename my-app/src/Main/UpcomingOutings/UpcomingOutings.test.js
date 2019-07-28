import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import UpcomingOutings from './UpcomingOutings';
import { configure, shallow, mount } from 'enzyme';

const golfer = {
    Username: "Brooks",
    Password: "Brooks1234",
    First_Name: "Brooks",
    Last_Name: "Koepka",
    Friends: [
      "Tiger",
      "Rory"
    ],
    Differntials: [
      {"Date": "4/11/2019, 3:30:00 PM",
       "Differntial": 66},
      {"Date": "4/12/2019, 3:30:00 PM",
      "Differntial": 71},
      {"Date": "4/13/2019, 3:30:00 PM",
       "Differntial": 69},
      {"Date": "4/14/2019, 3:30:00 PM",
      "Differntial": 70},
      {"Date": "5/16/2019, 3:30:00 PM",
      "Differntial": 63},
      {"Date": "5/17/2019, 3:30:00 PM",
      "Differntial": 65},
      {"Date": "5/18/2019, 3:30:00 PM",
      "Differntial": 68},
      {"Date": "5/19/2019, 3:30:00 PM",
      "Differntial": 65},
      {"Date": "6/15/2019, 3:30:00 PM",
      "Differntial": 68},
      {"Date": "6/16/2019, 3:30:00 PM",
      "Differntial": 68}
    ],
    Handicap: [
      {"Date": "5/16/2019, 3:30:00 PM",
      "Handicap": 67.8},
      {"Date": "6/16/2019, 3:30:00 PM",
      "Handicap": 66.8}
    ],
    Outings: [
      {Date: "3/16/2019, 3:30:00 PM",
      Location: "Augusta",
      Participants: ["Brooks"]},
      {Date: "9/16/2019, 3:30:00 PM",
      Location: "Augusta",
      Participants: ["Brooks", "Tiger", "Rory"]},
      {Date: "10/16/2019, 3:30:00 PM",
      Location: "Pebble Beach",
      Participants: ["Brooks", "Tiger", "Rory"]},
      {Date: "11/16/2019, 3:30:00 PM",
      Location: "Bethpage Black",
      Participants: ["Brooks", "Tiger"]}
      ]
}

describe('Testing <UpcomingOutings/>', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<UpcomingOutings golfer={golfer} />);
  });

  it("Lists all of the golfer's future outings", () => {
    expect(wrapper.find('#futureOutingsList').children()).toHaveLength(3);
  })
})
