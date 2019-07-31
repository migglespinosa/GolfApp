import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import SetOutings from './SetOutings';
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

describe('Testing <SetOutings/>', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SetOutings golfer={golfer}/>);
    const LocationWrapper = wrapper.find('#location');
    const DateWrapper = wrapper.find('#outing-date');
    const FriendWrapper = wrapper.find('#friend');
    const HoleWrapper = wrapper.find('#Hole');

    const FriendButton = wrapper.find('#AddFriend');
    const InviteButton = wrapper.find('#Invite');
  });

  it("You can invite people with whom you're already friends to an outing", () => {

    expect(wrapper.state('inviteSent')).toEqual(false);

    LocationWrapper.simulate("change", {target: { value: "Augusta"} });
    LocationWrapper.update();
    DateWrapper.simulate("change", {target: { value: "4/15/2020"} });
    DateWrapper.update();

    FriendWrapper.simulate("change", {target: { value: "Tiger"} });
    FriendButton.simulate('submit');
    expect(wrapper.state('isFriend')).toEqual(true);
    expect(wrapper.state('friendsInvited')).toEqual(1);

    FriendWrapper.simulate("change", {target: { value: "Jordan"} });
    FriendButton.simulate('submit');
    expect(wrapper.state('isFriend')).toEqual(false);
    expect(wrapper.state('friendsInvited')).toEqual(1);

    FriendWrapper.simulate("change", {target: { value: "Rory"} });
    FriendButton.simulate('submit');
    expect(wrapper.state('isFriend')).toEqual(true);
    expect(wrapper.state('friendsInvited')).toEqual(2);

    InviteButton.simulate('submit');
    expect(wrapper.state('inviteSent')).toEqual(true);
  });

  it("The 'Plan another outing' button only appears once an invite is sent, and clicking on the button sets inviteSent to false", () => {

    expect(wrapper.state('inviteSent')).toEqual(false);
    expect(wrapper.find('#PlanAnotherOuting').exists()).toEqual(false);

    LocationWrapper.simulate("change", {target: { value: "Augusta"} });
    LocationWrapper.update();
    DateWrapper.simulate("change", {target: { value: "4/15/2020"} });
    DateWrapper.update();
    FriendWrapper.simulate("change", {target: { value: "Tiger"} });
    FriendButton.simulate('submit');

    expect(wrapper.state('inviteSent')).toEqual(true);
    expect(wrapper.find('#PlanAnotherOuting').exists()).toEqual(true);
    const PlanAnotherButton = wrapper.find('#PlanAnotherOuting');
    PlanAnotherButton.simulate('submit');

    expect(wrapper.state('inviteSent')).toEqual(false);
    expect(wrapper.state('friend')).toEqual('');
    expect(wrapper.state('location')).toEqual('');
    expect(wrapper.state('date')).toEqual('');
  });


})
