import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

import {Container, Row, Col} from 'react-bootstrap';

import UpcomingOutings from './UpcomingOutings';
import SetOutings from './SetOutings';
import PendingOutings from './PendingOutings';
import InvitedOutings from './InvitedOutings';

class Outings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: 'create'
    }
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(newDisplay){
    this.setState({
      display: newDisplay
    })
  }


  render(){

    const buttons = (
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <button type="button" id="homeOutings" onClick={() => this.changeDisplay('create')}>
                Create
              </button>
              <button type="button" id="pendingOutings" onClick={() => this.changeDisplay('pending')}>
                Pending
              </button>
              <button type="button" id="invitedOutings" onClick={() => this.changeDisplay('invited')}>
                Invited
              </button>
              <button type="button" id="homeOutings" onClick={() => this.changeDisplay('default')}>
                Upcoming Outings
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    )

    let display;
    if(this.state.display === 'create'){
      display = (<SetOutings golfer={this.props.golfer}/>);
    }
    else if(this.state.display === 'invited'){
      display = (<InvitedOutings id={this.props.golfer._id}/>);
    }
    else if(this.state.display === 'pending'){
      display = (<PendingOutings golfer={this.props.golfer}/>);
    }
    else{
      display = (<UpcomingOutings golfer={this.props.golfer}/>);
    }

    return(
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              {buttons}
              {display}
              </Col>
            </Row>
          </Container>
      </div>
    )
  }
}

export default Outings;
