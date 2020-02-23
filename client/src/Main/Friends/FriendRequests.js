import React from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { searchUser, addRequests } from '../../Redux/actions/authActions';


class FriendRequests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      NameExists: null,
      RequestSent: false,
      Username: ''
    }
    this.search = this.search.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.setNameExists = this.setNameExists.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  handleUsernameChange(event){
    this.setState({Username: event.target.value,
    NameExists: null});
  }


  setNameExists(status){
    this.setState({NameExists: status})
  }


  search(event){

    this.props.searchUser(this.state.Username).then(res => {
      const taken = this.props.golfer.friends.some(friend => {
        return friend.username == this.state.Username
      })

      const sent = this.props.golfer.sentRequests.some(request => {
        return request.username == this.state.Username
      })

      const received = this.props.golfer.receivedRequests.some(request => {
        return request.username == this.state.Username
      })


      if(taken){
        this.setState({
          NameExists: "AlreadyFriends"
        })
      }
      else if(sent){
        this.setState({
          NameExists: "AlreadySent"
        })
      }
      else if(received){
        this.setState({
          NameExists: "AlreadyRecieved"
        })
      }
      else if(this.state.Username == this.props.golfer.username){
        this.setState({
          NameExists: "Yourself"
        })
      }
      else{
        this.setState({
          NameExists: res.exists,
          RequestSent: false
        })
      }
    })

    event.preventDefault();

  }

  sendRequest(){
    const requestObject = {
      username: this.state.Username,
    }
    this.props.addRequests(requestObject);
    this.setState({
      RequestSent: true
    })
  }

  render(){

    let existsMessage;
    if(this.state.NameExists == null){
      existsMessage = null
    }
    else if(this.state.NameExists == true){
      existsMessage = <h4>Add the user!</h4>
    }
    else if(this.state.NameExists == "Yourself"){
      existsMessage = <h4>You can't add youself</h4>
    }
    else if(this.state.NameExists == "AlreadyFriends"){
      existsMessage = <h4>You're already friends</h4>
    }
    else if(this.state.NameExists == "AlreadySent"){
      existsMessage = <h4>You've already sent {this.state.Username} a friend request.</h4>
    }
    else if(this.state.NameExists == "AlreadyRecieved"){
      existsMessage = <h4>You've already recieved a friend request from {this.state.Username}.</h4>
    }
    else if(this.state.NameExists == true && this.state.RequestSent == true){
      existsMessage = <h4>Request Sent!</h4>
    }
    else{
      existsMessage = <h4>Username does not exist</h4>
    }

    let sendRequest;
    if(this.state.NameExists == true && this.state.RequestSent == false){
      sendRequest = <button type="button" id="sendRequest" onClick={() => this.sendRequest()}>
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
        <h3>Search a golfer:</h3><br />
        {existsMessage} <br />
        {searchForm}
        {sendRequest}
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
  { searchUser, addRequests }
)(FriendRequests);
