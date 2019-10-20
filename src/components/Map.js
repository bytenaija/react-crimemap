import React, { useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import {
  Map, Marker, GoogleApiWrapper, InfoWindow,
} from 'google-maps-react';
import styled from 'styled-components';
import { Card, CardContent } from 'semantic-ui-react';
import { googleKey } from '../config';

const MapViewComponent = ({ crimes, google, center }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [infoWindowShow, setShowInfoWindow] = useState(false);

  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowInfoWindow(false);
  };

  const onMapClicked = () => {
    setActiveMarker(null);
    setShowInfoWindow(false);
  };

  const { latitude = 3.873777773, longitude = 4.83737373 } = center;

  return (
    <CardView className="map" data-testid="map-view">
      <CardContentWrapper>
        <MapViewWrapper data-testid="display-map">
          <MapViewDiv>
            <Map
              google={google}
              zoom={14}
              initialCenter={{ lat: latitude, lng: longitude }}
              center={{ lat: latitude, lng: longitude }}
              onClick={onMapClicked}
            >
              <Marker position={{ lat: latitude, lng: longitude }} />

              {crimes.map((crime) => (
                <Marker
                  key={crime._id}
                  position={{
                    lat: crime.location.coordinates[0],
                    lng: crime.location.coordinates[1],
                  }}
                  type={crime.type}
                  onClick={onMarkerClick}
                >
                  <InfoWindow
                    marker={activeMarker}
                    onClose={onInfoWindowClose}
                    visible={infoWindowShow}
                  >
                    <div>
                      <h2>{crime.type}</h2>

                      <button type="button">Click Me</button>

                      <div>{crime.type}</div>
                    </div>
                  </InfoWindow>
                </Marker>
              ))}
            </Map>
          </MapViewDiv>
        </MapViewWrapper>
        )}
      </CardContentWrapper>
    </CardView>
  );
};

const CardContentWrapper = styled(CardContent)`
  &&&& {
    padding: 0;
  }
`;
const MapViewDiv = styled.div`
  width: 100%;
  min-width: 300px;
  height: 300px;
`;

const MapViewWrapper = styled.div`
&&&& {
  padding: 0.2rem;
  background: #ffffff
  text-align: center;
  min-width: 300px;
  min-height: 250px;
  width: 100%;
  display: table;
}
`;

const CardView = styled(Card)`
  &&&& {
    width: 100%;
    min-width: 100%;
    height: 500px;
  }
`;
export default GoogleApiWrapper({
  apiKey: googleKey,
})(MapViewComponent);
