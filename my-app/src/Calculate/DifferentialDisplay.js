import React from 'react';
import Calculate from './Calculate';

function CreateList(props){


  //Sorting differentials by date
  const unsortedDifferentials = props.differentials;
  const sortedDifferentials = unsortedDifferentials.sort((a,b) =>
  (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

  //Displaying differentials as an unordered list
  const differentials = props.differentials.map(differential => (
    <ul id="differentialList">
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
