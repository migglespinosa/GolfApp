import React from 'react';
import Calculate from './Calculate';

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
  }
  render(){
    return(
      <CreateList handicaps={this.props.handicaps} />
    );
  }
}

export default HandicapDisplay;
