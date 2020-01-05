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
    console.log("findRecentHandicap this.props.golfer: ", this.props.golfer);
    console.log("isEmpty(findRecentHandicap)", this.props.golfer.handicap.length == 0);
    const handicap = this.props.golfer.handicap;



    /*
    console.log("Handicap :", new Date(Handicap[0].Handicap.Date).getTime())
    Handicap.sort(function(a,b) {
      return (b.Handicap.Date) - (a.Handicap.Date);
    });
    */

    let sortedHandicap;
    if(handicap.length == 0){
      sortedHandicap = 0;
    }
    else{
      const sorted = handicap.sort((a,b) =>
      (a.Date > b.Date) ? -1 : ((b.Date > a.Date) ? 1 : 0));
      sortedHandicap = sorted.Handicap
    }

    console.log("SotedHandicap :", sortedHandicap)
    this.setState({
      handicap: sortedHandicap
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
