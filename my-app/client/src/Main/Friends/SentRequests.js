import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

function CreateList(props){

  if(props.golfer.sentRequests){
  console.log("props.golfer.sentRequests: ", props.golfer.sentRequests);
    const friends = props.golfer.sentRequests.map(friend => (
      <ul>
        <li
          key={props.golfer.sentRequests.indexOf(friend)}
        >
          {friend.username}
        </li>
      </ul>
    ));
    return friends
  }
  else{
    return null;
  }
}

class SentRequests extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log("props.golfer.sentRequests: ", this.props.golfer.sentRequests);
    return(
      <div>
        <h3>You've sent requests to the following people:</h3>
        <CreateList id="sentRequestsList" golfer={this.props.golfer}/>
      </div>
    )
  }
}

export default SentRequests;
