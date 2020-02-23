import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import {Container, Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


import FriendList from './FriendList';
import FriendRequests from './FriendRequests';
import ReducedFriendList from './ReducedFriendList';
import ReceivedRequests from './ReceivedRequests';
import SentRequests from './SentRequests';

class Friends extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: 'search'
    }
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(newDisplay){
    this.setState({
      display: newDisplay
    })
  }

  render(){

    const buttonDisplay = (
      <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div>
              <button type="button" id="receivedRequests" onClick={() => this.changeDisplay('search')}>
                Search
              </button>
              <button type="button" id="receivedRequests" onClick={() => this.changeDisplay('list')}>
                Friends ({this.props.golfer.friends.length})
              </button>
              <button type="button" id="sentRequests" onClick={() => this.changeDisplay('sent')}>
                Sent
              </button>
              <button type="button" id="receivedRequests" onClick={() => this.changeDisplay('received')}>
                Received
              </button>
            </div>
            </Col>
          </Row>
      </Container>
      </div>
    );

    let display;
    if(this.state.display === 'search'){
      display = (
        <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <FriendRequests golfer={this.props.golfer}/>
              </Col>
            </Row>
        </Container>
        </div>
      )
    }
    else if(this.state.display === 'received'){
      display = (
        <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <ReceivedRequests golfer={this.props.golfer}/>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
    else if(this.state.display === 'sent'){
      display = (
        <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <SentRequests golfer={this.props.golfer}/>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
    else{
      display = (
        <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <FriendList golfer={this.props.golfer}/>
            </Col>
          </Row>
        </Container>
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
