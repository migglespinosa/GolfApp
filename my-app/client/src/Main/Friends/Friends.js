import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


import FriendList from './FriendList';
import FriendRequests from './FriendRequests';
import ReceivedRequests from './ReceivedRequests';
import SentRequests from './SentRequests';

class Friends extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: 'default'
    }
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(newDisplay){
    this.setState({
      display: newDisplay
    })
  }

  render(){

    let buttonDisplay;
    if(this.state.display == 'default'){
      buttonDisplay = (
        <div>
          <button type="button" id="sentRequests" onClick={() => this.changeDisplay('sent')}>
            Sent Requests
          </button>
          <button type="button" id="receivedRequests" onClick={() => this.changeDisplay('received')}>
            Received Requests
          </button>
        </div>
      )
    }
    else{
      buttonDisplay = (
        <div>
          <button type="button" id="receivedRequests" onClick={() => this.changeDisplay('default')}>
              List and Search Friends
          </button>
        </div>
      )
    }

    let display;
    if(this.state.display == 'default'){
      display = (
        <div>
          <Container>
            <Row>
              <Col><FriendRequests golfer={this.props.golfer}/></Col>
              <Col><FriendList golfer={this.props.golfer}/></Col>
            </Row>
          </Container>
        </div>
      )
    }
    else if(this.state.display == 'received'){
      display = (
        <div>
          <ReceivedRequests golfer={this.props.golfer}/>
        </div>
      )
    }
    else{
      display = (
        <div>
          <SentRequests golfer={this.props.golfer}/>
        </div>
      )
    }

    return(
      <div>
        {buttonDisplay}
        {display}
      </div>
    )
  }
}

export default Friends;
