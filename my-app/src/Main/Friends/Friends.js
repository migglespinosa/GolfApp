import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

function CreateList(props){

  if(props.golfer.Friends){
  //Lists all the golfer's friends
    const friends = props.golfer.Friends.map(friend => (
      <ul>
        <li
          key={props.golfer.Friends.indexOf(friend)}
        >
          {friend}
        </li>
      </ul>
    ));
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
