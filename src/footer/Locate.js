import React,{useState} from 'react'
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
/**
 * @author Aakash Rajput
 * @description this method renders the map component of the application
 * @param this method doesn't accept any parameters
 * @returns returns the JSX of map component
 */
const mapStyles = {
  width: '100%',
  height: '100%'
};

export class Locate extends React.Component {

  state = {
    showingInfoWindow: false, 
    activeMarker: {},       
    selectedPlace: {}     
  };

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};
  render() {
    return (
      <div className="custom-container">

    
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 29.37929374462847, 
            lng: 78.14303974937881 
          }
        }
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Bijnor'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA2qnga4sW7aUtVPMFh1J-fbUFfK3pzNtU'
})(Locate);