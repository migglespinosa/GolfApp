import React from 'react';
import DifferentialDisplay from './DifferentialDisplay';
import data from '../differentials.json';
import logo from '../logo.svg';
import '../App.css';

const populateArray = rounds => {
  console.log(rounds.length)
  const differentialArray = [];
  //rounds.forEach(round => {
  //  differentialArray.push();
  //})
  return differentialArray;
};

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
    this.differentialArray = populateArray(data);
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

  saveDifferential(){
    const currentDate = new Date();
    const differentialObject = {
      date: currentDate.toLocaleString(),
      differential: this.state.display
    }
    this.differentialArray.push(differentialObject);
  }


  render(){
    return(
      <div>
        <h1>Your handicap is: {this.state.display}</h1>
        <button type="button" id="Save" onClick={e => this.saveDifferential()}>
          Save Button
        </button>
        <form onSubmit={this.calculateDiff}>
          <label>
            Score:
            <input type="text" id="Score"
            value={this.state.Score}
            onChange={this.handleScoreChange} />
          </label> <br />
          <label>
            Course Rating:
            <input type="text" id="CourseRating"
            value={this.state.CourseRating}
            onChange={this.handleCourseRatingChange} />
          </label> <br />
          <label>
            Slope:
            <input type="text" id="Slope"
            value={this.state.Slope}
            onChange={this.handleSlopeChange} />
          </label> <br />
          <input type="submit" value="Submit" />
        </form>
        <DifferentialDisplay differentials={this.differentialArray}/>
      </div>
    );
  }
}

export default Calculate;
export {populateArray};
