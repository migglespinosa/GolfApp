import React from 'react';
import { connect } from 'react-redux';
import { deleteHandicap } from '../../Redux/actions/authActions';

function CreateList(props){


  //Sorting differentials by date
  const unsortedHandicaps = props.handicaps;
  const sortedHandicaps = unsortedHandicaps.sort((a,b) =>
  (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

  //Displaying differentials as an unordered list
  const handicaps = sortedHandicaps.map(handicap => (
    <ul id="handicapList">
      <li
        key={props.handicaps.indexOf(handicap)}
        onClick={() => props.deleteHandicap({handicap: handicap})}
      >
        On {handicap.date}, {handicap.handicap}
      </li>
    </ul>
  ));
  if(handicaps){
    return handicaps
  }
  else{
    return null;
  }
}

class HandicapDisplay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      edit: false
    }
    this.editToggle = this.editToggle.bind(this);
    this.deleteHandicap = this.deleteHandicap.bind(this);
  }

  editToggle(){
    this.setState((state, props) => ({
      edit: !state.edit
    }));
  }

  deleteHandicap(handicap){
    if(this.state.edit){
    this.props.deleteHandicap(handicap);
    }
  }

  render(){

    let deleteMessage;
    if(this.state.edit){
      deleteMessage = (<h2>Click on a handicap to delete it</h2>);
    }
    else{
      deleteMessage = null;
    }

    let editButton;
    if(this.props.golfer.handicap.length > 0){
      if(this.state.edit){
        editButton = (<button onClick={() => this.editToggle()}>Stop Editing</button>)
      }
      else{
        editButton = (<button onClick={() => this.editToggle()}>Edit</button>);
      }
    }
    else{
      editButton = null;
    }

    return(
      <div>
        <h2> Your handicaps: </h2>
        {editButton}
        {deleteMessage}
        <CreateList handicaps={this.props.golfer.handicap} deleteHandicap={this.deleteHandicap}/>
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
  {deleteHandicap}
)(HandicapDisplay);
