import React from 'react';
import ReactDOM from 'react-dom';
import Calculate from './Calculate';
import { configure, shallow, mount } from 'enzyme';

describe('Tests for <Calculate/>', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Calculate/>);

    const ScoreWrapper = wrapper.find('#Score');
    ScoreWrapper.simulate("change", {target: { value: 100} });
    ScoreWrapper.update();

    const CourseRatingWrapper = wrapper.find('#CourseRating');
    CourseRatingWrapper.simulate("change", {target: { value: 74.2} });
    CourseRatingWrapper.update();

    const SlopeWrapper = wrapper.find('#Slope');
    SlopeWrapper.simulate("change", {target: { value: 115} });
    SlopeWrapper.update();
  });

  it("Score input exists ", () => {
    expect(wrapper.find('#Score').exists()).toEqual(true);
  })

  it("A Golf Score of 100, a course rating of 74.2, and a slope of 115 generates a handicap differential of 25", () => {
    const SubmitButton = wrapper.find('[type="submit"]');
    SubmitButton.simulate('submit');
    expect(wrapper.state('display')).toEqual(25);
  })


  it("Clicking the 'Save' button adds your handicap differential to an array of scores", () => {

    expect(wrapper.find('#differentialList').children()).toHaveLength(0)
    const SubmitButton = wrapper.find('[type="submit"]');
    SubmitButton.simulate('submit');
    const SaveButton = wrapper.find('#Save');
    SaveButton.simulate('click');
    expect(wrapper.find('#differentialList').children()).toHaveLength(1);

  })

});
