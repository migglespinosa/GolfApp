import React from 'react';
import data from '../../golfers';
import '../../App.css';
import axios from "axios";
import jwt_decode from "jwt-decode";

const findHandicap = handicap => {

    let sortedHandicap;
    if(handicap.length === 0){
      sortedHandicap = 0;
    }
    else{
      const sorted = handicap.sort((a,b) =>
      (a.date < b.date) ? -1 : ((b.date < a.date) ? 1 : 0));

      sortedHandicap = sorted[0].handicap;
    }

    return sortedHandicap
}

class FriendDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      golfer: null
    }
  }

  componentDidMount(){

    axios.post("Golfers/" + this.props.selected)
    .then(res => {
      console.log("res:", res);
      this.setState({
        golfer: res.data
      })
    });
  }

  render(){

    let header;
    if(this.state.golfer){
     header = (<h2> About {this.state.golfer.first_name} {this.state.golfer.last_name} </h2>);
    }
    else{
      header = null;
    }

    let handicap, handicapMessage;
    if(this.state.golfer){
      handicap = findHandicap(this.state.golfer.handicap);
      handicapMessage = (<h5>Handicap: {handicap} </h5>);
    }
    else{
      handicap = null;
      handicapMessage = null;
    }

    let usernameMessage;
    if(this.state.golfer){
      usernameMessage = (<h5> Username: {this.state.golfer.username} </h5>);
    }
    else{
      usernameMessage = null;
    }

    let friendsMessage;
    if(this.state.golfer){
      friendsMessage = (<h5> Numer of Friends: {this.state.golfer.friends.length} </h5>);
    }
    else{
      friendsMessage = null;
    }

    return(
      <div>
        {header}
        {handicapMessage}
        {usernameMessage}
        {friendsMessage}
      </div>
    )
  }
}

export default FriendDetails;
