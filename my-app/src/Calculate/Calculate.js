import React from 'react';
import DifferentialDisplay from './DifferentialDisplay';
import HandicapDisplay from './HandicapDisplay';
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
      Slope: 0,
      handicap: 0,
      differentialArray: [],
      handicapArray: []
    }
    this.calculateDiff = this.calculateDiff.bind(this);
    this.CalculateHandicap = this.CalculateHandicap.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleCourseRatingChange = this.handleCourseRatingChange.bind(this);
    this.handleSlopeChange = this.handleSlopeChange.bind(this);
    this.differentialArray = populateArray(data);
    this.saveHandicap = this.saveHandicap.bind(this);
  }

  calculateDiff(event){
    const differential = (this.state.Score - this.state.CourseRating)*(113/this.state.Slope)
    this.setState({
      display: Math.round(differential)
    });
    console.log("differential" + this.state.display)
    event.preventDefault();
  }

  CalculateHandicap(event){
    console.log("Handicap Clicked")
    const sortedDifferentials = this.state.differentialArray;
    sortedDifferentials.sort((a,b) => (a.differential > b.differential) ? 1 : ((b.differential > a.differential) ? -1 : 0));
    console.log(sortedDifferentials)
    var total = 0;
    var i;
    for(i = 0; i < 5; i++){
      console.log(sortedDifferentials[i].differential)
      total = total + sortedDifferentials[i].differential;
    }
    this.setState({
      handicap: (total)/5
    })
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
    //var appended = this.state.differentialArray.concat(differentialObject);
    //console.log(appended)
    this.setState({
      differentialArray: [...this.state.differentialArray, differentialObject]
    });
    console.log(this.state.differentialArray);
  }

  saveHandicap(){
    const currentDate = new Date();
    const handicapObject = {
      date: currentDate.toLocaleString(),
      handicap: this.state.handicap
    }
    this.setState({
      handicapArray: [...this.state.handicapArray, handicapObject]
    });
  }

  render(){
    return(
      <div>
        <h1>Currently, your total handicap is {this.state.handicap}</h1>
        <h2>Your differential is: {this.state.display}</h2>
        <button type="button" id="Save" onClick={e => this.saveDifferential()}>
          Save Differential
        </button> <br />
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
          <DifferentialDisplay differentials={this.state.differentialArray}/><br />
          <HandicapDisplay handicaps={this.state.handicapArray}/>
        <div>
          {this.state.differentialArray.length >= 5 ? (
            <button type="button" key="Calculate" id="CalculateHandicaps" onClick={e => this.CalculateHandicap()}>CalculateHandicap</button>) : (
            "To Calculate your handicap, please save more than five differentials!"
          )}
        </div>
        <button type="button" id="saveHandicap" onClick={e => this.saveHandicap()}>
          Save Handicap
        </button>
      </div>
    );
  }
}

export default Calculate;
export {populateArray};
