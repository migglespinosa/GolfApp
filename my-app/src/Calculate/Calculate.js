import React from 'react';
import logo from '../logo.svg';
import '../App.css';

class Calculate extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      display: 0,
      Score: 0,
      CourseRating: 0,
      Slope: 0
    }
    this.calculateDiff = this.calculateDiff.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleCourseRatingChange = this.handleCourseRatingChange.bind(this);
    this.handleSlopeChange = this.handleSlopeChange.bind(this);
  }

  calculateDiff(event){
    const differential = (this.state.Score - this.state.CourseRating)*(113/this.state.Slope)
    this.setState({
      display: Math.round(differential)
    });
    console.log("differential" + this.state.display)
    event.preventDefault();
  }

  handleScoreChange(event){
    this.setState({Score: event.target.value});
  }

  handleCourseRatingChange(event){
    this.setState({CourseRating: event.target.value});
  }

  handleSlopeChange(event){
    this.setState({Slope: event.target.value});
  }


  render(){
    return(
      <div>
        <h1>Your handicap is: {this.state.display}</h1>
        <form onSubmit={this.calculateDiff}>
          <label>
            Score:
            <input type="text" value={this.state.Score} onChange={this.handleScoreChange} />
          </label> <br />
          <label>
            Course Rating:
            <input type="text" value={this.state.CourseRating} onChange={this.handleCourseRatingChange} />
          </label> <br />
          <label>
            Slope:
            <input type="text" value={this.state.Slope} onChange={this.handleSlopeChange} />
          </label> <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Calculate;
