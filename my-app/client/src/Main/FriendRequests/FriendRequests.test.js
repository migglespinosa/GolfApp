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
    wrapper = mount(<FriendRequests golfer={golfer}/>);
  });

  it("Searching for a name that doesn't exist sets NameExists to 'false'", () => {
    const SearchUsername = wrapper.find('#SearchUsername');
    const SearchButton = wrapper.find('[type="submit"]');
    SearchUsername.simulate("change", {target: {value: "Dustin"}});
    SearchButton.simulate('submit');
    expect(wrapper.state('NameExists')).toEqual(false);
  })

  it("Searching for a name that does exist and is not already a friend sets NameExists to 'true'", () => {
    const SearchUsername = wrapper.find('#SearchUsername');
    const SearchButton = wrapper.find('[type="submit"]');
    SearchUsername.simulate("change", {target: {value: "Rory"}});
    SearchButton.simulate('submit');
    expect(wrapper.state('NameExists')).toEqual(true);
  })

  it("Searching for your own name sets NameExists to 'Yourself'", () => {
    const SearchUsername = wrapper.find('#SearchUsername');
    const SearchButton = wrapper.find('[type="submit"]');
    SearchUsername.simulate("change", {target: {value: "Jordan"}});
    SearchButton.simulate('submit');
    expect(wrapper.state('NameExists')).toEqual("Yourself");
  })

  it("Searching for a name that does exist and is already a friend sets NameExists to 'AlreadyFriends'", () => {
    const SearchUsername = wrapper.find('#SearchUsername');
    const SearchButton = wrapper.find('[type="submit"]');
    SearchUsername.simulate("change", {target: {value: "Tiger"}});
    SearchButton.simulate('submit');
    expect(wrapper.state('NameExists')).toEqual("AlreadyFriends");
  })


})
