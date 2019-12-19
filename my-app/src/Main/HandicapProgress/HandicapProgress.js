import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import * as V from 'victory';
import { VictoryContainer, VictoryChart, VictoryScatter} from 'victory';

class HandicapProgress extends React.Component {

  render(){
    const Handicaps = this.props.golfer.Handicap;

    //Converts the handicap dates into Date objects. This is necessary because
    //VictoryScatter only accepts Date objects.
    const newHandicaps = Handicaps.map(handicap => {
      const newHandicap = {}
      newHandicap.Date = new Date(handicap.Date);
      newHandicap.Handicap = handicap.Handicap;
      return newHandicap;
    });

    console.log(newHandicaps);

    return(

      <VictoryChart
        height={200} width={300}
        maxDomain={{y: 120}}
        containerComponent={<VictoryContainer responsive={false}/>}
        scale={{x: 'time'}}>
        <VictoryScatter
          style={{ data: { fill: "#c43a31" } }}
          size={7}
          data={newHandicaps}
          x="Date"
          y="Handicap"
        />
      </VictoryChart>
    );

  }
}

export default HandicapProgress;
