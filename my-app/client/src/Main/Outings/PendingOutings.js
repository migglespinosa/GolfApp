import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import axios from "axios";
import PendingOutingsDetails from './PendingOutingsDetails';

class PendingOutings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      details: false,
      outings: null,
      currentOuting: ''
    };
  }

  componentDidMount(){

    axios.get("Outings/GolferPending/"+this.props.golfer._id)
    .then(res => {
      const outings = res.data.filter(outing => {
        if(outing.pending == true){
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

  render(){

    const Outings = this.state.outings;
    console.log("PendingOutings: ", Outings);

    let pendingOutings, pendingOutingsConfirmed;
    if(Outings != null){
      pendingOutings = Outings.filter(outing => new Date(outing.date).getTime() > this.state.date);
      pendingOutingsConfirmed = pendingOutings.filter(outing => {
        if(outing.pending == true){
          return outing
        }
      })
    }
    else{
      pendingOutingsConfirmed = null;
    }

    let list;
    if(pendingOutingsConfirmed){
      list = (pendingOutingsConfirmed.map(outing => (
        <ul id="pendingOutingsList">
          <li
            key={pendingOutingsConfirmed.indexOf(outing)}
            onClick={() => {this.setState({
              details: true,
              currentOuting: outing._id})
            }}>
             to play at {outing.location} on {outing.date} id: {outing._id}
          </li>
        </ul>)));
    }
    else{
      list = null;
    }

    if(this.state.details == false){
      return(
        <div>
          <h4>You are awaiting confirmation:</h4>
          {list}
        </div>
      )
    }
    else{
      return(
        <div>
          <PendingOutingsDetails outing={this.state.currentOuting}/>
        </div>
      )
    }
  }
}

export default PendingOutings;
