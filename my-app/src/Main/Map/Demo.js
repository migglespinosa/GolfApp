import React, { Component } from "react";
import Map from "./Map";
import { geolocated } from "react-geolocated";
import { StandaloneSearchBox } from '@react-google-maps/api';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }


  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }


  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
    //console.log("Error :" + error);
    //console.log("errorInfo :" + errorInfo)
  }


    render(){
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>{this.props.coords.latitude}</h1>;
      }
      else{

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
                /*
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

                  <StandaloneSearchBox
                    onError={error => console.log(error)}
                    onLoad={ref => this.searchBox = ref}
                    onPlacesChanged={
                      () => console.log(this.searchBox.getPlaces())
                    }
                  >
                    <input
                      type="text"
                      placeholder="Customized your placeholder"
                      style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "50%",
                        marginLeft: "-120px"
                      }}
                    />
                    </StandaloneSearchBox>

                </GoogleMap>
                </LoadScript>
                */
              </div>

        ) : (
            <div>Getting the location data</div>
        )
      );
    }
  }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);
