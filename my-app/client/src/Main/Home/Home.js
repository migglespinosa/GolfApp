import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      handicap: null
    }
    this.findRecentHandicap = this.findRecentHandicap.bind(this);
  }

  //findRecentHandicap sorts a golfer's handicap differentials by date,
  //and sets the handicap state to the most recent score.
  findRecentHandicap(){
    const Handicap = this.props.golfer.Handicap;

    /*
    console.log("Handicap :", new Date(Handicap[0].Handicap.Date).getTime())
    Handicap.sort(function(a,b) {
      return (b.Handicap.Date) - (a.Handicap.Date);
    });
    */

    const SortedHandicap = Handicap.sort((a,b) =>
    (a.Date > b.Date) ? -1 : ((b.Date > a.Date) ? 1 : 0));

    console.log("SotedHandicap :", SortedHandicap)
    this.setState({
      handicap: SortedHandicap[0].Handicap
    });
  }

  //Once the home component mounts, findRecentHandicap is called.
  componentDidMount(){
    this.findRecentHandicap();
  }

  render(){

    //Displays to the user his or her most recent handicap.
    const HandicapMessage = (
      <div>
        <h1>Your handicap is {this.state.handicap}</h1>
      </div>
    )

    return(
      <div>
        {HandicapMessage}
      </div>
    );
  }

}

export default Home;
