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

    const pendingButton =
      (<button type="button" id="pendingOutings" onClick={() => this.changeDisplay('pending')}>
        Pending Outings
      </button>)

    const invitedButton =
    (<button type="button" id="invitedOutings" onClick={() => this.changeDisplay('invited')}>
      Invited Outings
    </button>)

    const defaultButton =
    (<button type="button" id="invitedOutings" onClick={() => this.changeDisplay('default')}>
      Outings Home
    </button>)

    let buttonDisplay;
    if(this.state.display == 'default'){
      buttonDisplay = (
        <div>
          {pendingButton}
          {invitedButton}
        </div>
      )
    }
    else if(this.state.display == 'pending'){
      buttonDisplay = (
        <div>
          {invitedButton}
          {defaultButton}
        </div>
      )
    }
    else{
      buttonDisplay = (
        <div>
          {pendingButton}
          {defaultButton}
        </div>
      )
    }

    let display;
    if(this.state.display == 'default'){
      display = (
        <div>
          <Container>
            <Row>
              <Col><UpcomingOutings golfer={this.props.golfer}/></Col>
              <Col><SetOutings golfer={this.props.golfer}/></Col>
            </Row>
          </Container>
        </div>
      )
    }
    else if(this.state.display == 'invited'){
      display = (
        <div>
          <InvitedOutings id={this.props.golfer._id}/>
        </div>
      )
    }
    else{
      display = (
        <div>
          <PendingOutings golfer={this.props.golfer}/>
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

export default Outings;
