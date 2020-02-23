import React from 'react';
import '../../App.css';

import {Container, Row, Col} from 'react-bootstrap';
import DifferentialDisplay from './DifferentialDisplay';
import HandicapDisplay from './HandicapDisplay';

class Score extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: 'handicaps'
    }
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(display){
    this.setState({
      display: display
    })
  }

  render(){

    const buttons = (
      <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <button onClick={() => this.changeDisplay("handicaps")}>Handicaps</button>
            <button onClick={() => this.changeDisplay("diffentials")}>Differentials</button>
          </Col>
        </Row>
      </Container>
      </div>
    );


    let display;
    if(this.state.display == "handicaps"){
      display = <HandicapDisplay golfer={this.props.golfer}/>
    }
    else{
      display = <DifferentialDisplay golfer={this.props.golfer}/>
    }


    return(
      <div>
      {buttons}
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              {display}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Score;
