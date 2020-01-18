import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

import {Container, Row, Col} from 'react-bootstrap';

import UpcomingOutings from './UpcomingOutings';
import SetOutings from './SetOutings';

class Outings extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
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
}

export default Outings;
