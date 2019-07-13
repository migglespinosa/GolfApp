import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login'
import { configure, shallow, mount } from 'enzyme';

describe('Testing <Login />', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Login/>);
  });

  it("Logging in with 'Username: Tiger' and 'Password: Tiger1234' works"){

    const UsernameWrapper = wrapper.find('#Username');
    const PasswordWrapper = wrapper.find('#Password');
    const LoginWrapper = wrapper.find('#Login');
    UsernameWrapper.simulate("keydown", {which: 'Tiger'}});
    PasswordWrapper.simulate("keydown", {which: 'Tiger1234'}});
    UsernameWrapper.update();
    PasswordWrapper.update();
    LoginWrapper.simulate('click');
    expect(wrapper.state('isLoggedin')).toEqual(true);
    
  }
})
