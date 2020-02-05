import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import axios from "axios";

class PendingOutingsDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      details: null
    }
  }

  componentDidMount(){

    console.log("this.props.outing ", this.props.outing);

    axios.get("Outings/" + this.props.outing)
    .then(res => {
      console.log("res");
      const participants = res.data.participants.map(participant => {
        return {
          username: participant.participant.username,
          first_name: participant.participant.first_name,
          last_name: participant.participant.last_name,
          confirmed: participant.confirmed
        }
      })

      this.setState({
        details: participants
      })
    });
  }

  render(){

    let listConfirmed;
    if(this.state.details){
      listConfirmed = this.state.details.map(outing => {
        if(outing.confirmed == true){
          return (<ul id="confirmedOutingsList">
              <li
                key={this.state.details.indexOf(outing)}
              >
                 {outing.username} ({outing.first_name} {outing.last_name})
              </li>
            </ul>)
        }
      });
    }
    else{
      return null;
    }

    let listPending;
    if(this.state.details){
      listPending = this.state.details.map(outing => {
        if(outing.confirmed == false){
          return (<ul id="unconfirmedOutingsList">
              <li
                key={this.state.details.indexOf(outing)}
              >
                 {outing.username} ({outing.first_name} {outing.last_name})
              </li>
            </ul>)
        }
      });
    }
    else{
      return null;
    }


    if(this.state.details != null){
      return(
        <div>
          <h1>Awaiting Confirmation</h1>
          {listPending}
          <h1>Already Confirmed</h1>
          {listConfirmed}
        </div>

      )
    }
    else{
      return(
        <h1>Hi</h1>
      )
    }
  }
}

export default PendingOutingsDetails;
