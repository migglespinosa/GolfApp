import React from 'react';
import '../../App.css';

import { connect } from 'react-redux';
import { searchUser, addPendingOuting } from '../../Redux/actions/authActions';


class SetOutings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      friendsInvited: [],
      friendsInvitedIds: [],

      addFriend: false,
      inviteSent: false,
      isFriend: null,

      invitationMessage: '',

      friend: "",
      location: "",
      date: ""
    }
    this.AddFriend = this.AddFriend.bind(this);
    this.handleFriendChange = this.handleFriendChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
  }

  //Search the golfer's friend list to see if the invited person is already a friend.
  //If the invitee is a friend, isFriend is set to true and a friend is appended
  //friendsInvited
  AddFriend(event){

    if(this.state.friend == this.props.golfer.username){
      this.setState({
        isFriend: "Yourself"
      });
    }
    else if(!(this.props.golfer.friends.filter(friend => friend.username === this.state.friend).length > 0)){
      this.setState({
        isFriend: false
      });
    }
    else{
      this.props.searchUser(this.state.friend).then(res => {
        this.setState({
          isFriend: true,
          friendsInvited: [...this.state.friendsInvited, this.state.friend],
          friendsInvitedIds: [...this.state.friendsInvitedIds, res.id]
        });
      })
    }
    event.preventDefault();
  }

  //Event handler for changing friend state
  handleFriendChange(event){
    this.setState({friend: event.target.value});
  }
  //Event handler for changing location state
  handleLocationChange(event){
    this.setState({location: event.target.value,
                   invitationMessage: ''});
  }
  //Event handler for changing date state
  handleDateChange(event){
    this.setState({date: event.target.value,
                   invitationMessage: ''});
  }

  //TEMPORARY: Since a server hasn't been purchased yet, sendInvite will only
  //set inviteSent to true
  sendInvite(event){
    if(this.state.friendsInvited.length > 0){
      const participants = this.state.friendsInvitedIds.map(participant => {
        return {
          participant: participant,
          confirmed: false
        }
      })

      participants.push({
        participant: this.props.golfer._id,
        confirmed: true
      })

      const outing = {
        creator: this.props.golfer._id,
        pending: true,
        location: this.state.location,
        date: this.state.date,
        participants: participants
      }

      this.props.addPendingOuting(outing);

      this.setState((state) => ({inviteSent: !state.inviteSent,
                                 invitationMessage: 'Invitation Sent',
                                 addFriend: !state.addFriend}));
    }
    else{
      this.setState({invitationMessage: 'Friend needed'})
    }
    event.preventDefault();
  }

  //sendAnotherInvite resets all the fields for an invite to "" or empty
  sendAnotherInvite(event){
    console.log("sendAnotherInvite triggered");
    this.setState((state) => ({
                   inviteSent: !state.inviteSent,
                   friend: "",
                   friendsInvited: [],
                   location: "",
                   date: ""}), function (){ console.log("first: ", this.state.inviteSent)});
    //event.preventDefault();
  }

  render(){
    //Destructuring state into local variables to avoid typing `this.state` everytime
    const { friendsInvited, inviteSent, isFriend, friend, location, date } = this.state;

    let friendMessage;
    if(this.state.isFriend == false){
      friendMessage = <h4>You are not friends</h4>;
    }
    else if(this.state.isFriend == "Yourself"){
      friendMessage = <h4>You can't add yourself.</h4>;
    }
    else{
      friendMessage = null;
    }

    //inviteForm allows you to select a date and golf course for a future outing.
    const inviteForm = (
      <div>
        <form onSubmit={this.sendInvite}>
          <label>
            Location:
            <input type="text" id="location"
            value={location}
            onChange={this.handleLocationChange}
            required/>
          </label> <br />
          <label>
            Date:
            <input type="date"
            id="outing-date"
            name="outing-date"
            value={date}
            onChange={this.handleDateChange}
            min="2018-01-01" max="2020-12-31"
            required/><br />
          </label><br />
          <input type="submit" id="sendInvite" value="Submit"/>
        </form>
      </div>
    );

    //addFriendForm allows you to search for someone in your friend's list to
    //include to your outing. If the person is not your friend or doesn't exist,
    //then isFriend is set to false.
    let addFriendForm;
    if(this.state.addFriend){
      addFriendForm = (
      <div>
        <form onSubmit={this.AddFriend}>
          <label>
            Enter the name of a friend:
            <input type="text" id="friend"
            value={friend}
            onChange={this.handleFriendChange} />
          </label> <br />
          <input type="submit" id="AddFriend" value="Search" />
        </form>
      </div>);
    }
    else{
      addFriendForm = (<button onClick={() => this.setState({addFriend: true})}>
                        Add friends
                       </button>);
    }

    //Displays an unordered list of friends you're planning to invite to your
    //golf outing.
    let friendsInvitedList;
    if(this.state.inviteSent == false){
      if(friendsInvited.length > 0){
        friendsInvitedList = (
          friendsInvited.map(friend => (
            <ul>
              <li
                key={friendsInvited.indexOf(friend)}
              >
                {friend}
              </li>
            </ul>
          ))
        );
      }
      else{
        friendsInvitedList = null;
      }
    }
    else{
      friendsInvitedList = null;
    }


    //Displays a message whether an invite has been sent.
    let invitationMessage;
    if(this.state.invitationMessage == 'Invitation Sent'){
      invitationMessage = (<h4>Invitation Sent!</h4>);
    }
    else if(this.state.invitationMessage == 'Friend needed'){
      invitationMessage = (<h4>You must add at least one <br />
                            friend to create an outing</h4>);
    }
    else if(this.state.invitationMessage == null){
      invitationMessage = null;
    }
    else{
      invitationMessage = null;
    }

    //sendAnotherInvite Button only appears once inviteSent is 'True'
    let sendAnotherInvite;
    if(inviteSent == true){
      sendAnotherInvite = (<button type="button" id="PlanAnotherOuting" onClick={e => this.sendAnotherInvite(e)}>
                            Plan Another Outing! </button>);
    }
    else{
      sendAnotherInvite = null;
    }

    return(
      <div>
        <h1>Create an outing</h1>
        {invitationMessage}
        {inviteForm}
        {friendMessage}
        {addFriendForm}
        {friendsInvitedList}
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
  { searchUser, addPendingOuting}
)(SetOutings);
