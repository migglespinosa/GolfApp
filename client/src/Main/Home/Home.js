import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import {Container, Row, Col} from 'react-bootstrap';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      handicap: null
    }
    this.findRecentHandicap = this.findRecentHandicap.bind(this);
  }

  //findRecentHandicap sorts a golfer's handicap differentials by date,
  //and sets the handicap state to the most recent score.
  findRecentHandicap(){
    const handicap = this.props.golfer.handicap;



    /*
    console.log("Handicap :", new Date(Handicap[0].Handicap.Date).getTime())
    Handicap.sort(function(a,b) {
      return (b.Handicap.Date) - (a.Handicap.Date);
    });
    */

    let sortedHandicap;
    if(handicap.length === 0){
      sortedHandicap = 0;
    }
    else{
      const sorted = handicap.sort((a,b) =>
      (a.handicap < b.handicap) ? -1 : ((b.handicap < a.handicap) ? 1 : 0));

      sortedHandicap = sorted[0].handicap;
    }

    this.setState({
      handicap: sortedHandicap
    });
  }

  //Once the home component mounts, findRecentHandicap is called.
  componentDidMount(){
    this.findRecentHandicap();
  }

  render(){

    return(
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <p>Welcome to Virtual Caddy,
                {this.props.golfer.first_name} {this.props.golfer.last_name}! <br />
                The Caddy enables you to calculate your handicap, befriend <br />
                other golfers, and set up outings
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default Home;
