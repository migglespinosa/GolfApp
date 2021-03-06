import React, { Component } from "react";
import Map from "./Map";
import { geolocated } from "react-geolocated";
import { StandaloneSearchBox } from '@react-google-maps/api';
import { KmlLayer } from '@react-google-maps/api';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress } from 'react-places-autocomplete';
import Geocode from "react-geocode";

class Demo extends React.Component {
    constructor(props){
      super(props);
        this.state = {
          address: []
        }

    }


    getLocation(event){
      console.log("getLocation Clicked");

      console.log("address: ", this.state.address);

      console.log("# of addresses : ", this.state.address.length);

      geocodeByAddress('Los Angeles, CA')
        .then(results => console.log("results :", results))
        .catch(error => console.error(error));

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

      Geocode.fromAddress(this.state.address).then(
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

                        () => console.log("Search box: ", this.searchBox)
                        //() => this.setState({address: this.searchBox.getPlaces()})
                      }
                    >
                      <input
                        type="text"
                        placeholder="Search Golf Courses"
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
