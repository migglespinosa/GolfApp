import React, { Component } from "react";
import Map from "./Map";
import { geolocated } from "react-geolocated";
import { StandaloneSearchBox } from '@react-google-maps/api';
import { KmlLayer } from '@react-google-maps/api';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode";

class Demo extends React.Component {
    constructor(props){
      super(props);
        this.state = {
          longitude: "",
          latitude: ""
        }

    }

    getLocation(event){
      console.log("getLocation Clicked");

      Geocode.setApiKey("AIzaSyC602BxQt0PqL-Dv-mzDS8i-8f6Q4aoVtA");

      Geocode.enableDebug();

      Geocode.fromAddress("Eiffel Tower").then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
        },
        error => {
          console.error(error);
        }
      );
    }

    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
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
                    <tr>
                        <td>altitude</td>
                        <td>{this.props.coords.altitude}</td>
                    </tr>
                    <tr>
                        <td>heading</td>
                        <td>{this.props.coords.heading}</td>
                    </tr>
                    <tr>
                        <td>speed</td>
                        <td>{this.props.coords.speed}</td>
                    </tr>
                </tbody>

                <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyBduZ-iDIEaq4AI6MrEoJb6_OV_9WXM1y8"
                libraries={['places']}
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
                <button type="button" id="saveHandicap" onClick={e => this.getLocation()}>
                  Get Location
                </button>
            </table>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);
