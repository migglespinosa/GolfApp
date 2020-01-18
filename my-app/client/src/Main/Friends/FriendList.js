import React from 'react';
import '../../App.css';

function CreateList(props){

  if(props.golfer.friends){
  //Lists all the golfer's friends
    const friends = props.golfer.friends.map(friend => (
      <ul>
        <li
          key={props.golfer.friends.username}
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


class FriendList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h3>Your friends include:</h3>
        <CreateList id="friendsList" golfer={this.props.golfer}/>
      </div>
    )
  }
}

export default FriendList;
