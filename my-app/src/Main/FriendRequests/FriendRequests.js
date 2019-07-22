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

  search(){
    let exists;
    let count = data.length;
    for(let i = 0; i < count; i++){
      if(data[i].Username == this.state.Username){
        exists = true;
      }
    }
    if(exists == false){
      this.setState({
        NameExists: false
      });
    }
    else{
      this.setState({
        NameExists: true
      });
    }
  }

  render(){

      let existsMessage;
      if(this.state.NameExists == null){
        existsMessage = null
      }
      else if(this.state.NameExists == true){
        existsMessage = <h2>Add the user!</h2>
      }
      else{
        existsMessage = <h2>Username does not exist</h2>
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
        {searchForm}
      </div>
    )
  }
}

export default FriendRequests;
