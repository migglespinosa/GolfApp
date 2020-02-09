import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import axios from "axios";

const isPending = function(participant, index, array){
  return participant.confirmed == false
}

class InvitedOutings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      outings: null,
      date: new Date()
    }
    this.acceptOuting = this.acceptOuting.bind(this);
    this.declineOuting = this.declineOuting.bind(this);
    this.isConfirmed = this.isConfirmed.bind(this);
  }

  componentDidMount(){

    axios.get("Outings/GolferPending/"+this.props.id)
    .then(res => {
      const outings = res.data.filter(outing => {
        if(outing.creator != this.props.id){
          return {
            id: outing._id,
            creator: outing.creator,
            pending: outing.pending,
            date: outing.date,
            location: outing.location,
            participants: outing.participants
          }
        }
      })
      this.setState({
        outings: outings
      })
    });
  }

  acceptOuting(outingId){

    const currentOuting = this.state.outings.filter(outing => {
      if(outing._id == outingId){
        return outing;
      }
    })

    const filteredOutings = this.state.outings.filter(outing => {
      if(outing._id  != outingId){
        return outing;
      }
    })

    let participantId;
    currentOuting[0].participants.forEach(participant => {
      if(participant.participant == this.props.id){
        participantId = participant._id
      }
    })



    axios.put("Outings/accept/"+outingId, {participantId: participantId}).
    then(res => {
      this.setState({
        outings: filteredOutings
      })
    })
  }

  declineOuting(outingId){

    const currentOuting = this.state.outings.filter(outing => {
      if(outing._id == outingId){
        return outing;
      }
    })

    const filteredOutings = this.state.outings.filter(outing => {
      if(outing._id  != outingId){
        return outing;
      }
    })

    let participantId;
    currentOuting[0].participants.forEach(participant => {
      if(participant.participant == this.props.id){
        participantId = participant._id
      }
    })

    axios.put("Outings/decline/"+outingId, {participantId: participantId}).
    then(res => {
      this.setState({
        outings: filteredOutings
      })
    })
  }

  isConfirmed(participant, index, array){
    return participant.confirmed == true && participant.participant == this.props.id
  }


  render(){

    const Outings = this.state.outings;

    let invitedOutings, invitedOutingsPending;
    if(Outings != null){
      invitedOutings = Outings.filter(outing => new Date(outing.date).getTime() > this.state.date);
      invitedOutingsPending = invitedOutings.filter(outing => {
        if(outing.participants.some(this.isConfirmed) == false && outing.pending == true){
          return outing
        }})
    }
    else{
      invitedOutings = null;
      invitedOutingsPending = null;
    }

    let list;
    if(invitedOutingsPending){
      list = (invitedOutingsPending.map(outing => (
        <ul id="invitedOutingsList">
          <li
            key={invitedOutingsPending.indexOf(outing)}
          >
             to play at {outing.location} on {outing.date} id: {outing._id}
             <button onClick={() => this.acceptOuting(outing._id)}>Accept</button>
             <button onClick={() => this.declineOuting(outing._id)}>Decline</button>
          </li>
        </ul>)));
    }
    else{
      list = null;
    }

    return(
      <div>
        <h1>Invited outings</h1>
        {list}
      </div>
    )
  }
}

export default InvitedOutings;
