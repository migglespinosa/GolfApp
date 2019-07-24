import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import SetOutings from './SetOutings';
import { configure, shallow, mount } from 'enzyme';

describe('Testing <SetOutings/>', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SetOutings />);
  });

})
