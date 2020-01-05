import React from 'react';
import logo from '../../logo.svg';
import Demo from './Demo.js';
import '../../App.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api'


class Map extends React.Component {


  constructor(props) {
      super(props);

      this.getInnerRef = this.getInnerRef.bind(this);
      this.getLocation = this.getLocation.bind(this);
  }

  innerRef;
  getInnerRef(ref) {
      this.innerRef = ref;
  }

  getLocation() {
      this.innerRef && this.innerRef.getLocation();
  }

  render(){
    
    const { getInnerRef, getLocation } = this;
    return(
      <div>
        <article style={{ textAlign: "center" }}>
        {/* eslint-disable-next-line no-console*/}
          <Demo onError={error => console.log(error)} ref={getInnerRef} />
          <button
            className="pure-button pure-button-primary"
            onClick={getLocation}
            type="button"
          >
            Update Location
            </button>
        </article>
      </div>
    )
  }

}

export default Map;
