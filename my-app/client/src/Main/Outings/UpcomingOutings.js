import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';


class UpcomingOutings extends React.Component {
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }

  render(){

    console.log("UpcomingOutings outings: ", this.props.golfer.outings);

    // Destructure props into local variables to avoid typing `this.props` everytime
    const Outings = this.props.golfer.outings;

    // Build a filtered array of outings that occur in the future
    const fututeOutings = Outings.filter(outing => new Date(outing.date).getTime() > this.state.date);

    //Returns true or false depending on whether the outing
    //is past today's date
    let list;
    if(fututeOutings){
      list = (fututeOutings.map(outing => (
        <ul id="futureOutingsList">
          <li
            key={fututeOutings.indexOf(outing)}
          >
            On {outing.date}, you will play at {outing.location}
          </li>
        </ul>)));
    }
    else{
      list = null;
    }

    return(
      <div>
        <h1>Upcoming outings</h1>
        {list}
      </div>
    )
  }
}

export default UpcomingOutings;
