import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Score from './Score';
import Map from './Map';
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

});
