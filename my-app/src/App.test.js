import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<App/>', () => {

  it('Renders', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('.Golf').exists()).toEqual(true);
  })
});
