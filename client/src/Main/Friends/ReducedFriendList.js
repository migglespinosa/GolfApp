import React from 'react';
import '../../App.css';

function CreateList(props){
  
  if(props.friends){
  //Lists all the golfer's friends
    const friends = props.friends.map(friend => (
      <ul>
        <li
          key={props.friends.indexOf(friend)}
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

function ListContainer(props){

  var random = [];
  var friends = props.friends;
  var friendsLength = friends.length;
  var listLength = 5;

  if(friendsLength > 6){
    while(listLength--){
      var j = Math.floor(Math.random()*(friends.length));
      random.push(friends[j])
      friends.splice(j, 1);
    }
    return <CreateList friends={random}/>
  }
  else{
    return <CreateList friends={friends}/>
  }

  //return <CreateList friends={friends}/>
}


class ReducedFriendList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div>
        <h3>Your friends include:</h3>
        <ListContainer id="reducedFriendsList" friends={this.props.friends}/>
      </div>
    )
  }
}

export default ReducedFriendList;
