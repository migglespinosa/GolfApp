import React from 'react';
import ReactDOM from 'react-dom';
import FriendRequests from './FriendRequests';
import { configure, shallow, mount } from 'enzyme';

const golfer = {
  Username: "Jordan",
  Password: "Jordan1234",
  First_Name: "Jordan",
  Last_Name: "Spieth",
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

describe('Tests for <FriendRequests/>', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<FriendRequests golfer={golfer}/>)
  })

  it("Clicking on the Add Friend button adds golfers that exist in the database", () => {

    const SearchUsername = wrapper.find('#SearchUsername');
    const SearchButton = wrapper.find('[type="submit"]');
    //const SendFriendRequest = wrapper.find('#SendFriendRequest');

    SearchUsername.simulate("change", {target: {value: "Dustin"}});
    SearchButton.simulate('submit');
    expect(wrapper.state('NameExists')).toEqual(false);
    SearchUsername.simulate("change", {target: {value: "Rory"}});
    SearchButton.simulate('submit');
    expect(wrapper.state('NameExists')).toEqual(true);
  })

})
