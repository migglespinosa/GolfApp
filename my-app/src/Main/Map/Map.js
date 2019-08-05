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
        googleMapsApiKey="AIzaSyBduZ-iDIEaq4AI6MrEoJb6_OV_9WXM1y8"
        //{...other props}
      >
        <GoogleMap
          id='example-map'
          mapContainerStyle={{
            height: "400px",
            width: "800px"
          }}
          zoom={7}
          center={{
            lat: -3.745,
            lng: -38.523
          }}
        >
          ...Your map components
        </GoogleMap>
      </LoadScript>
      </div>
    )
  }
}

export default Map;
