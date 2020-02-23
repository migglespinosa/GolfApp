import React, { Component } from 'react';
import Calculate from './Calculate/Calculate';
import Home from './Home/Home';
import Friends from './Friends/Friends';
import HandicapProgress from './HandicapProgress/HandicapProgress';
import Map from './Map/Map';
import Score from './Score/Score';
import Outings from './Outings/Outings';
import Settings from './Settings/Settings';
import Buttons from './Buttons';

import { connect } from 'react-redux';
import { logoutGolfer } from '../Redux/actions/authActions';

const greeting = {
  textAlign: 'center'
}

class Main extends Component{
  constructor(props){
    super(props);
      this.state = {
        display: 'Home'
      }
      this.setComponent = this.setComponent.bind(this);
      this.setHome = this.setHome.bind(this);
  }

  setHome(){
    this.setState({
      display: 'Home'
    });
  }

  setComponent(componentToBeSet){
    this.setState({
      display: componentToBeSet
    });
  }

  render(){

    let body;
    if(this.state.display === 'Home'){
      body = <Home golfer={this.props.golfer}/>
    }
    else if(this.state.display === "Calculate"){
      body = <Calculate golfer={this.props.golfer}/>
    }
    else if(this.state.display === "Friends"){
      body = <Friends golfer={this.props.golfer}/>
    }
    else if(this.state.display === "Map"){
      body = <Map/>
    }
    else if(this.state.display === "Score"){
      body = <Score golfer={this.props.golfer}/>
    }
    else if(this.state.display === "Outings"){
      body = <Outings golfer={this.props.golfer}/>
    }
    else if(this.state.display === "Settings"){
      body = <Settings/>
    }

    return(
      <div>
        <h1 onClick={e => this.setHome()} style={greeting}>Virtual Caddy</h1>
        <Buttons setComponent={this.setComponent}/>
        {body}
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
  {logoutGolfer}
)(Main);
