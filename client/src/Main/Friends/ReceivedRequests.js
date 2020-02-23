import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import { connect } from 'react-redux';
import { declineRequest, acceptRequest } from '../../Redux/actions/authActions';


function CreateList(props){

  if(props.golfer.receivedRequests){
  //Lists all the golfer's sentRequests
    const friends = props.golfer.receivedRequests.map(friend => (
      <ul>
        <li
          key={props.golfer.receivedRequests.indexOf(friend)}
        >
          {friend.username} {"(" + friend.first_name  + " " + friend.last_name + ")"}
          <button onClick={()=>props.acceptRequest(
            {username: friend.username,
             first_name: friend.first_name,
             last_name: friend.last_name}
          )}>Accept</button>
          <button onClick={()=> props.declineRequest(
            {username: friend.username}
          )}>Decline</button>
        </li>
      </ul>
    ));
    return friends
  }
  else{
    return null;
  }
}

class ReceivedRequests extends React.Component {
  constructor(props){
    super(props);
    this.declineRequest = this.declineRequest.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
  }

  declineRequest(rejectObject){
    this.props.declineRequest(rejectObject);
  }

  acceptRequest(acceptObject){
    this.props.acceptRequest(acceptObject);
  }

  render(){
    return(
      <div>
        <h3>The following people have sent you a friend request:</h3>
        <CreateList id="friendsList" golfer={this.props.golfer} declineRequest={this.declineRequest} acceptRequest={this.acceptRequest}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {declineRequest, acceptRequest}
)(ReceivedRequests);
