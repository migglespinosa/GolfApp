import React from "react";
import { geolocated } from "react-geolocated";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

class Demo extends React.Component {
    render() {
        return(

          !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
          <div>
            <table>
                <tbody>
                    <tr>
                        <td>latitude</td>
                        <td>{this.props.coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{this.props.coords.longitude}</td>
                    </tr>
                </tbody>
              </table>
                <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyBduZ-iDIEaq4AI6MrEoJb6_OV_9WXM1y8"
              >
                <GoogleMap
                  id='example-map'
                  mapContainerStyle={{
                    height: "400px",
                    width: "800px"
                  }}
                  zoom={14}
                  center={{
                    lat: this.props.coords.latitude,
                    lng: this.props.coords.longitude
                  }}
                >
                  ...Your map components
                </GoogleMap>
                </LoadScript>
              </div>
        ) : (
            <div>Getting the location data</div>
        )
      );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);
