import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';


class UpcomingOutings extends React.Component {
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }

  render(){

    // Destructure props into local variables to avoid typing `this.props` everytime
    const Outings = this.props.golfer.Outings;

    // Build a filtered array of outings that occur in the future
    const fututeOutings = Outings.filter(outing => new Date(outing.Date).getTime() > this.state.date);

    //Returns true or false depending on whether the outing
    //is past today's date
    let list;
    if(fututeOutings){
      list = (fututeOutings.map(outing => (
        <ul id="futureOutingsList">
          <li
            key={fututeOutings.indexOf(outing)}
          >
            On {outing.Date}, you will play at {outing.Location}
          </li>
        </ul>)));
    }
    else{
      list = null;
    }

    return(
      <div>
        <h1>Hi {this.props.golfer.First_Name}</h1>
        {list}
      </div>
    )
  }
}

export default UpcomingOutings;
