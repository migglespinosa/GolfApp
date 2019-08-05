import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api'


class Map extends React.Component {
  render(){
    return(
      <div>
        <h1>This is the Map Component</h1>
        <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyBduZ-iDIEaq4AI6MrEoJb6_OV_9WXM1y8 "
        //{...other props}
      >
        <GoogleMap
          id='example-map'
          {...other props }
        >
          ...Your map components
        </GoogleMap>
      </LoadScript>
      </div>
    )
  }
}

export default Map;
