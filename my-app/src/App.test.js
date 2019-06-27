import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Score from './Score/Score.js';
import Map from './Map/Map.js';
import { configure, shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App/>);
  });

  it('Renders', () => {
    expect(wrapper.find('.Golf').exists()).toEqual(true);
  })

  it('Contains <Score/>', () => {
    expect(wrapper.find(Score).exists()).toEqual(true);
  })

  it('Contains <Map/>', () => {
    expect(wrapper.find(Map).exists()).toEqual(true);
  })

  it('Contains <Calculate/>', () => {
    expect(wrapper.find(Calculate).exists()).toEqual(true);
  })

  it('Contains <Friends/>', () => {
    expect(wrapper.find(Friends).exists()).toEqual(true);
  })

  it('Contains <FriendRequests/>', () => {
    expect(wrapper.find(FriendRequests).exists()).toEqual(true);
  })

  it('Contains <SetAppointments/>', () => {
    expect(wrapper.find(SetAppointments).exists()).toEqual(true);
  })

  it('Contains <UpcomingAppointments/>', () => {
    expect(wrapper.find(UpcomingAppointments).exists()).toEqual(true);
  })

  it('Contains <HandicapProgress/>', () => {
    expect(wrapper.find(HandicapProgress).exists()).toEqual(true);
  })

  it('Contains <SearchCourses/>', () => {
    expect(wrapper.find(SearchCourses).exists()).toEqual(true);
  })

  it('Contains <SearchRanges/>', () => {
    expect(wrapper.find(SearchRanges).exists()).toEqual(true);
  })

  it('Contains <SearchShops/>', () => {
    expect(wrapper.find(SearchShops).exists()).toEqual(true);
  })


});
