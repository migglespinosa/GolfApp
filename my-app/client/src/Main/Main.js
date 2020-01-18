import React, { Component } from 'react';
import Calculate from './Calculate/Calculate';
import Home from './Home/Home';
import Friends from './Friends/Friends';
import HandicapProgress from './HandicapProgress/HandicapProgress';
import Map from './Map/Map';
import Score from './Score/Score';
import Outings from './Outings/Outings';
import Buttons from './Buttons';

const greeting = {
  textAlign: 'center'
}

const homeStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
    }, function(){
      console.log("componentToBeSet: ", componentToBeSet)
    });
  }

  render(){

    let body;
    if(this.state.display == 'Home'){
      body = <Home golfer={this.props.golfer}/>
    }
    else if(this.state.display == "Calculate"){
      body = <Calculate golfer={this.props.golfer}/>
    }
    else if(this.state.display == "Friends"){
      body = <Friends golfer={this.props.golfer}/>
    }
    else if(this.state.display == "HandicapProgress"){
      body = <HandicapProgress golfer={this.props.golfer}/>
    }
    else if(this.state.display == "Map"){
      body = <Map/>
    }
    else if(this.state.display == "Score"){
      body = <Score/>
    }
    else if(this.state.display == "Outings"){
      body = <Outings golfer={this.props.golfer}/>
    }

    //HomeButton displays whenever a user is not on the home page. Clicking
    //on it returns the user to the homepage.
    let homeButton;
    if(this.state.display != 'Home'){
      homeButton = <button onClick={e => this.setHome()} style={homeStyle} id="homeButton">Return Home</button>
    }
    else{
      homeButton = null;
    }

    return(
      <div>
        {homeButton}
        <h1 onClick={e => this.setHome()} style={greeting}>Welcome {this.props.golfer.first_name} {this.props.golfer.last_name} </h1>
        <Buttons setComponent={this.setComponent}/>
        {body}
      </div>
    );
  }
}


export default Main;
