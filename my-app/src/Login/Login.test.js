import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login'
import App from '../App'
import { configure, shallow, mount } from 'enzyme';

describe('Testing <Login />', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App/>);
  });

  it("SubmitLogin Button exists", () => {
    expect(wrapper.find('#SubmitLogin').exists()).toEqual(true);
  })

  it("Logging in with 'Username: Tiger' and 'Password: Tiger1234' works", () => {
    const UsernameWrapper = wrapper.find('#Username');
    const PasswordWrapper = wrapper.find('#Password');
    const LoginWrapper = wrapper.find('#SubmitLogin');
    //UsernameWrapper.simulate("keydown", Tiger);
    UsernameWrapper.simulate("change", {target: {value: "Tiger"}});
    PasswordWrapper.simulate("change", {target: {value: "Tiger1234"}});
    //PasswordWrapper.simulate("keydown", {which: 'Tiger1234'}});
    UsernameWrapper.update();
    PasswordWrapper.update();
    LoginWrapper.simulate('submit');
    expect(wrapper.state('isLoggedin')).toEqual(true);
  })
});
