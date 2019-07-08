import React from 'react';
import Calculate from './Calculate';

function CreateList(props){

  const differentials = props.differentials.map(differential => (
    <li
      key={props.differentials.indexOf(differential)}
    >
      {differential.date} + {differential.differential}
    </li>
  ));
  if(differentials){
    return differentials
  }
  else{
    return null;
  }
}

class DifferentialDisplay extends React.Component {

  constructor(props){
    super(props);
  }
  render(){
    return(
      <CreateList differentials={this.props.differentials} />
    );
  }
}

export default DifferentialDisplay;
