import React from 'react';
import '../../App.css';
import FriendDetails from './FriendDetails';

function CreateList(props){

  if(props.golfer.friends){
  //Lists all the golfer's friends
    const friends = props.golfer.friends.map(friend => (
      <ul>
        <li
          key={props.golfer.friends.indexOf(friend)}
          onClick={() => props.select(friend.id)}
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
    this.state = {
      selected: null
    }
    this.select = this.select.bind(this);
  }

  select(id){
    this.setState({
      selected: id
    })
  }

  back(){
    this.setState({
      selected: null
    })
  }

  render(){

    const title = (<h3>Your friends include:</h3>);
    const detailsMessage = (<p>Click on a friends name to view their details!</p>)

    if(this.state.selected == null){
      return(
        <div>
          {title}
          {detailsMessage}
          <CreateList id="friendsList" golfer={this.props.golfer} select={this.select}/>
        </div>
      )
    }
    else{
      return(
        <FriendDetails selected={this.state.selected} back={this.back}/>
      )
    }
  }
}

export default FriendList;
