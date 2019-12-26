import React from 'react';
import data from '../../golfers';
import '../../App.css';


class FriendRequests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      NameExists: null,
      Username: ''
    }
    this.search = this.search.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleUsernameChange(event){
    this.setState({Username: event.target.value});
  }

  //Searches golfers.json to see whether the name entered into the searchBar exists.
  search(event){
    let exists;
    let count = data.length;
    for(let i = 0; i < count; i++){
      if(data[i].Username == this.state.Username){
        exists = true;
      }
    }
    if(exists == true){
      //If the username is equal to the profile's username,
      //NameExists is set to "Yourself"
      if(this.props.golfer.Username == this.state.Username){
        this.setState({
          NameExists: "Yourself"
        });
        event.preventDefault();
      }
      else{
        //If the username is NOT equal to the profile's username,
        //and the username is already included in the golfer's friends lists
        //NameExists is set to "AlreadyFriends"
        if(this.props.golfer.Friends.includes(this.state.Username) == true){
          this.setState({
            NameExists: "AlreadyFriends"
          });
          event.preventDefault();
        }
        //If the username is NOT equal to the profile's username,
        //and the username is NOT included in the golfer's friends lists
        //NameExists is set to "true"
        else{
          this.setState({
            NameExists: true
          });
        }
        event.preventDefault();
      }
    }
    //If exists is null or false,
    //NameExists is set to "false"
    else{
      this.setState({
        NameExists: false
      });
      event.preventDefault();
    }
  }

  render(){

    //existsMessage contents are determined by the state of Name Exists
    let existsMessage;
    if(this.state.NameExists == null){
      existsMessage = null
    }
    else if(this.state.NameExists == true){
      existsMessage = <h2>Add the user!</h2>
    }
    else if(this.state.NameExists == "Yourself"){
      existsMessage = <h2>You can't add youself</h2>
    }
    else if(this.state.NameExists == "AlreadyFriends"){
      existsMessage = <h2>You're already friends!</h2>
    }
    else{
      existsMessage = <h2>Username does not exist</h2>
    }

    let sendRequest;
    if(this.state.NameExists == true){
      sendRequest = <button type="button" id="sendRequest">
      Send {this.state.Username} a friend request</button>
    }
    else{
      sendRequest = null;
    }

    const searchForm = (
      <div>
        <form onSubmit={this.search}>
          <label>
            Enter a Username :
          </label>
          <input type="text" id="SearchUsername"
                 value={this.state.value}
                 onChange={this.handleUsernameChange}/>
          <br />
          <input type="submit" value="Search"/>
        </form>
      </div>
    )


    return(
      <div>
        <h1>This is the FriendRequests Component</h1><br />
        {existsMessage} <br />
        {sendRequest} <br />
        {searchForm}
      </div>
    )
  }
}

export default FriendRequests;
