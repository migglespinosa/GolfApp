import React from 'react';
import logo from '../logo.svg';
import '../App.css';

function CalcButton(props){
  const CourseRating = props.CourseRating;
  const Score = props.Score;
  const Slope = props.Slope;
  return(
    <button type="button"
            key="differential"
            onClick={e => props.calculateDiff(Score, CourseRating, Slope)}>Calculate</button>
  );
}

function GatherInput(props){
  const settingVariable = props.settingVariable;
  return(
    <form>
      Your Score: <input type="number" id="Score" name="Score"
                  onChange={e => settingVariable(document.getElementById('Score').value, "Score")}/><br/>

      Course Rating: <input type="number" id="CourseRating"name="CourseRating"
                     onChange={e => settingVariable(document.getElementById('CourseRating').value, "CourseRating")}/><br/>

      Slope Rating: <input type="number" id="Slope" name="Slope"
                    onChange={e => settingVariable(document.getElementById('Slope').value, "Slope")}/><br/>
    </form>
  );
}

class Calculate extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      differential: 0,
      Score: 0,
      CourseRating: 0,
      Slope: 0
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

  settingVariable(Variable, Type){
    console.log("Type " + Type)
    if(Type == "Score"){
      console.log("Score" + Variable);
      this.setState({
        Score: Variable
      });
    }
    else if(Type == "CourseRating"){
      console.log("CourseRating " + Variable);
      this.setState({
        CourseRating: Variable
      });
    }
    else if(Type == "Slope"){
      console.log("Slope" + Variable);
      this.setState({
        Slope: Variable
      });
    }
  }


  render(){
    return(
      <div>
        <h1>Calculate your handicap differential.</h1>
          <GatherInput settingVariable={this.settingVariable}/>
          <CalcButton Score={this.state.Score}
                         CourseRating={this.state.CourseRating}
                         Slope={this.state.Slope}
                         calculateDiff={this.calculateDiff}/>

        <h2>Your differential is: {this.state.differential}</h2>

      </div>
    )
  }
}

export default Calculate;
