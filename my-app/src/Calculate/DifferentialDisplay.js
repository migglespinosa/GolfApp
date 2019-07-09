import React from 'react';
import Calculate from './Calculate';

function CreateList(props){

  const differentials = props.differentials.map(differential => (
    <ul id="differentialList" key="List">
      <li
        key={props.differentials.indexOf(differential)}
      >
        {differential.date} + {differential.differential}
      </li>
    </ul>
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
