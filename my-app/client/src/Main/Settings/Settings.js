import React from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { logoutGolfer } from '../../Redux/actions/authActions';
import {Container, Row, Col} from 'react-bootstrap';

class Settings extends React.Component {

  logout(){
    this.props.logoutGolfer()
  }

  render(){

    const logoutButton = <button onClick={e => this.logout()} id="logoutButton">Log Out</button>

    return(
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              {logoutButton}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {logoutGolfer}
)(Settings);
