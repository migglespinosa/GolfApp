import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import { connect } from 'react-redux';
import { addDifferentials, addHandicaps} from '../../Redux/actions/authActions';
import logo from '../../logo.svg';
import '../../App.css';

const populateArray = rounds => {
  const differentialArray = [];
  rounds.forEach(round => {
    differentialArray.push(round);
  })
  return differentialArray;
};

class Calculate extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      display: null,
      Score: 0,
      CourseRating: 0,
      Slope: 0,
      handicap: 0,
      differentialArray: populateArray(this.props.golfer.differentials),
      handicapArray: this.props.golfer.handicap,
      differentialSaved: false,
      differentialCalculated: false,
      handicapCalculated: false,
      handicapSaved: false
    }
    this.calculateDiff = this.calculateDiff.bind(this);
    this.CalculateHandicap = this.CalculateHandicap.bind(this);
    this.handleScoreChange = this.handleScoreChange.bind(this);
    this.handleCourseRatingChange = this.handleCourseRatingChange.bind(this);
    this.handleSlopeChange = this.handleSlopeChange.bind(this);
    this.differentialArray = populateArray(this.props.golfer.differentials);
    this.saveHandicap = this.saveHandicap.bind(this);
  }

  calculateDiff(event){
    const differential = (this.state.Score - this.state.CourseRating)*(113/this.state.Slope)
    this.setState({
      display: Math.round(differential),
      differentialCalculated: true
    });
    event.preventDefault();
  }

  CalculateHandicap(event){
    const sortedDifferentials = this.state.differentialArray;
    sortedDifferentials.sort((a,b) => (a.differential > b.differential) ? 1 : ((b.differential > a.differential) ? -1 : 0));
    var total = 0;
    var i;
    for(i = 0; i < 5; i++){
      total = total + sortedDifferentials[i].differential;
    }
    this.setState({
      handicap: (total)/5,
      handicapCalculated: true
    })
  }

  handleScoreChange(event){
    this.setState({Score: event.target.value});
  }

  handleCourseRatingChange(event){
    this.setState({CourseRating: event.target.value});
  }

  handleSlopeChange(event){
    this.setState({Slope: event.target.value});
  }

  saveDifferential(){
    const currentDate = new Date();
    const differentialObject = {
      date: currentDate.toLocaleString(),
      differential: this.state.display
    }

    this.props.addDifferentials(differentialObject);

    this.setState({
      differentialArray: [...this.state.differentialArray, differentialObject],
      differentialCalculated: false,
      differentialSaved: true
    });
  }

  saveHandicap(){
    const currentDate = new Date();
    const handicapObject = {
      date: currentDate.toLocaleString(),
      handicap: this.state.handicap
    }
    this.props.addHandicaps(handicapObject);
    this.setState({
      handicapArray: [...this.state.handicapArray, handicapObject],
      handicapCalculated: false,
      handicapSaved: true
    });
  }

  render(){

    let differentialMessage;
    if(this.state.differentialSaved == false){
      differentialMessage = null;
    }
    else{
      differentialMessage = (<p>Saved! You can view all <br />
                            your differntials in the score tab </p>)
    }

    let handicapMessage;
    if(this.state.handicapSaved == true && this.state.handicapCalculated == false){
      handicapMessage = (<p>Saved! You can view all <br />
                            your handicaps in the score tab </p>)
    }
    else{
      handicapMessage = null;
    }

    let handicapSave;
    if(this.state.handicapCalculated == false){
      handicapSave = null;
    }
    else{
      handicapSave = (
        <div>
          <p>You handicap is {this.state.handicap} </p>
          <button type="button" id="saveHandicap" onClick={e => this.saveHandicap()}>
            Save
          </button>
        </div>
      )
    }

    return(
      <div>
        <Container>
          <Row>
            <Col>
            <h4>Calculate your latest differential: </h4>
            <form onSubmit={this.calculateDiff}>
              <label>
                Score:
                <input type="text" id="Score"
                value={this.state.Score}
                onChange={this.handleScoreChange} />
              </label> <br />
              <label>
                Course Rating:
                <input type="text" id="CourseRating"
                value={this.state.CourseRating}
                onChange={this.handleCourseRatingChange} />
              </label> <br />
              <label>
                Slope:
                <input type="text" id="Slope"
                value={this.state.Slope}
                onChange={this.handleSlopeChange} />
              </label> <br />
              <input type="submit" value="Calculate" />
            </form>
            {this.state.differentialCalculated == true ? (
              <div>
                <div>
                  <p> Your latest differential is {this.state.display}. </p>
                  <button type="button" id="Save" onClick={e => this.saveDifferential()}>
                    Save
                  </button>
                </div>
              </div>
            ) : ("")}
            {(this.state.differentialSaved == true &&
              this.state.differentialCalculated == false) ? (
              <div>
              {differentialMessage}
              </div>
            ): ("")}
            </Col>
            <Col>
              <h4>Calculate your handicap: </h4>
              <div>
                {this.state.differentialArray.length >= 5 ? (
                  <button type="button" key="Calculate" id="CalculateHandicaps" onClick={e => this.CalculateHandicap()}>Calculate</button>) : (
                  "To Calculate your handicap, please save more than five differentials!"
                )}
              </div>
              {handicapSave}
              {handicapMessage}
          </Col>
        </Row>
      </Container>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addDifferentials, addHandicaps }
)(Calculate);

export {populateArray};
