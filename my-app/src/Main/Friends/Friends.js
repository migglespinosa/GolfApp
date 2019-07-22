import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

function CreateList(props){

  //Lists all the golfer's friends
  const friends = props.golfer.Friends.map(friend => (
    <ul id="differentialList">
      <li
        key={props.golfer.Friends.indexOf(friend)}
      >
        {friend}
      </li>
    </ul>
  ));
  if(friends){
    return friends
  }
  else{
    return null;
  }
}


class Friends extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>Your friends include:</h1>
        <CreateList id="friendsList" golfer={this.props.golfer}/>
      </div>
    )
  }
}

export default Friends;
