import React from 'react';
import '../../App.css';
import { searchUser } from '../../Redux/actions/authActions';
import axios from "axios";

class UpcomingOutings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      outings: null,
      date: new Date()
    };
  }

  componentDidMount(){

    axios.get("Outings/Confirmed/"+this.props.golfer._id)
    .then(res => {
      const outings = res.data.filter(outing => {
        if(outing.pending === false){
          return {
            id: outing._id,
            creator: outing.creator,
            pending: outing.pending,
            date: outing.date,
            location: outing.location,
            participants: outing.participants
          }
        }
      })
      this.setState({
        outings: outings
      })
    });
  }

  render(){

    // Destructure props into local variables to avoid typing `this.props` everytime
    const Outings = this.state.outings;

    let futureOutings;
    if(Outings != null){
      futureOutings = Outings.filter(outing => new Date(outing.date).getTime() > this.state.date);
    }
    else{
      futureOutings = null;
    }

    //Returns true or false depending on whether the outing
    //is past today's date
    let list;
    if(futureOutings){
      list = (futureOutings.map(outing => (
        <ul id="futureOutingsList">
          <li
            key={futureOutings.indexOf(outing)}
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
