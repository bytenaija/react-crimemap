/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';
import { Card, CardContent } from 'semantic-ui-react';
import React, { Component } from 'react';
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Circle,
} from 'google-maps-react';
import { googleKey } from '../config';
import Icon from '../assets/marker.png';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = () => {
    const showingInfoWindow = this.state;
    if (showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
    });
  };

  render() {
    const { zoom } = this.props;
    const {
      center: { latitude = 3.873777773, longitude = 4.83737373 },
    } = this.props;
    const bounds = new this.props.google.maps.LatLngBounds();
    if (this.props.bounds) {
      for (let i = 0; i < this.props.bounds.length; i++) {
        bounds.extend(this.props.bounds[i]);
      }
    }

    return (
      <CardView className="map" data-testid="map-view">
        <CardContentWrapper>
          <MapViewWrapper data-testid="display-map">
            <MapViewDiv>
              <Map
                google={this.props.google}
                ref={input => (this.ref = input)}
                onClick={this.onMapClicked}
                zoom={zoom || 14}
                initialCenter={{ lat: latitude, lng: longitude }}
                center={{ lat: latitude, lng: longitude }}
                style={{ width: '100%', height: '100%' }}
              >
                <Marker
                  position={{
                    lat: latitude,
                    lng: longitude,
                  }}
                  icon={Icon}
                />

                <Circle
                  center={{
                    lat: latitude,
                    lng: longitude,
                  }}
                  radius={1000}
                  strokeColor="teal"
                  strokeOpacity={0.2}
                  strokeWeight={3}
                  fillColor="purple"
                  fillOpacity={0.2}
                  editable={false}
                  draggable={false}
                />
                {this.props.crimes.map(crime => {
                  return (
                    <Marker
                      key={crime._id}
                      onClick={this.onMarkerClick}
                      type={crime.type}
                      address={crime.address}
                      id={crime._id}
                      position={{
                        lat: crime.location.coordinates[1],
                        lng: crime.location.coordinates[0],
                      }}
                    />
                  );
                })}
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div className="info">
                    <h6>{this.state.selectedPlace.type}</h6>
                    <h6>{this.state.selectedPlace.address}</h6>
                    <a
                      href={`/incident/${this.state.selectedPlace.id}`}
                    >
                      View Details
                    </a>
                  </div>
                </InfoWindow>
              </Map>
            </MapViewDiv>
          </MapViewWrapper>
        </CardContentWrapper>
      </CardView>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleKey,
  libraries: ['places'],
})(MapContainer);

const CardContentWrapper = styled(CardContent)`
  &&&& {
    padding: 0;
  }
`;
const MapViewDiv = styled.div`
  width: 100%;
  min-width: 300px;
`;

const MapViewWrapper = styled.div`
&&&& {
  padding: 0.2rem;
  background: #ffffff
  text-align: center;
  min-width: 300px;
  width: 100%;
  display: table;
}
`;

const CardView = styled(Card)`
  &&&& {
    width: 100%;
    min-width: 100%;
    height: 700px;
  }
`;
