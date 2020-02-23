import React from 'react';
import { connect } from 'react-redux';
import { deleteDifferential } from '../../Redux/actions/authActions';

function CreateList(props){

  const differentials = props.differentials;

  let differentialList;
  if(differentials){
    differentialList = (differentials.map(differential => (
      <ul id="differentialList">
        <li
          key={differentials.indexOf(differential)}
          onClick={() => props.deleteDifferential({differential: differential})}>
          On {differential.date}, {differential.differential}
        </li>
      </ul>)));
  }
  else{
    differentialList = null;
  }
  return differentialList

}

class DifferentialDisplay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      edit: false
    }
    this.editToggle = this.editToggle.bind(this);
    this.deleteDifferential = this.deleteDifferential.bind(this);
  }

  editToggle(){
    this.setState((state, props) => ({
      edit: !state.edit
    }));
  }

  deleteDifferential(differential){
    if(this.state.edit){
    this.props.deleteDifferential(differential);
    }
  }

  render(){

    let deleteMessage;
    if(this.state.edit){
      deleteMessage = (<h4>Click on a differential to delete it</h4>);
    }
    else{
      deleteMessage = null;
    }

    let editButton;
    if(this.props.golfer.differentials.length > 0){
      if(this.state.edit){
        editButton = (<button onClick={() => this.editToggle()}>Stop Editing</button>);
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
        <h2> Your differentials: </h2>
        {editButton}
        {deleteMessage}
        <CreateList differentials={this.props.golfer.differentials} deleteDifferential={this.deleteDifferential}/>
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
  {deleteDifferential}
)(DifferentialDisplay);
