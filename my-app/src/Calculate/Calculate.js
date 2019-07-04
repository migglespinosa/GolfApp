import React from 'react';
import logo from '../logo.svg';
import '../App.css';

function CalcButton(props){
  const CourseRating = props.CourseRating;
  const Score = props.Score;
  const Slope = props.Slope;
  console.log("CR " + CourseRating);
  console.log("Score " + Score);
  console.log("Slope " + Slope);
  return(
    <button type="button"
            key="differential"
            onClick={e => props.calculateDiff(Score,CourseRating,Slope)}>Calculate</button>
  );
}

class Calculate extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      differential: 0
    }
    this.calculateDiff = this.calculateDiff.bind(this);
  }

  calculateDiff(Score, CourseRating, Slope){
    const differential = (Score - CourseRating)*(113/Slope)
    console.log(differential)
    this.setState({
      display: differential
    });
  }

  render(){
    return(
      <div>
        <h1>Calculate your handicap differential.</h1>
        <form>
          Your Score: <input type="number" id="Score" name="Score"/><br/>
          Course Rating: <input type="number" id="CourseRating "name="CourseRating"/><br/>
          Slope Rating: <input type="number" id="Slope" name="Slope"/><br/>
        </form><br/>
          <CalcButton Score={8}
                         CourseRating={2}
                         Slope={4}
                         calculateDiff={this.calculateDiff}/>

        <h2>Your differential is: {this.state.differential}</h2>

      </div>
    )
  }
}

export default Calculate;
