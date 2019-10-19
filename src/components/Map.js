import React, { useEffect, useState } from 'react'
import Geocode from 'react-geocode'
import { Map, Marker, GoogleApiWrapper, GoogleAPI } from 'google-maps-react'
import { googleKey } from '../config'
import styled from 'styled-components'
import { Card, CardContent } from 'semantic-ui-react'


const MapViewComponent = ({
  state,
  google,
  center
}) => {
  // const [latlng, setLatLng] = useState(null)
  // useEffect(() => {
  //   Geocode.setApiKey(googleKey)
  //   if (state) {
  //     Geocode.fromAddress(`${state}, ${country}`).then(
  //       (response: any) => {
  //         const { lat, lng } = response.results[0].geometry.location

  //         setLatLng({ lat, lng })
  //       },
  //       (error: any) => {
  //         return
  //       }
  //     )
  //   } else {
  //     Geocode.fromAddress(`${country}`).then(
  //       (response: any) => {
  //         const { lat, lng } = response.results[0].geometry.location

  //         setLatLng({ lat, lng })
  //       },
  //       (error: any) => {
  //         return
  //       }
  //     )
  //   }
  // }, [setLatLng, country, state])
  const { latitude, longitude } = center;
  return (
    <CardView className="map" data-testid="map-view">
      <CardContentWrapper>
      
          <MapViewWrapper data-testid="display-map">
            <MapViewDiv>
              <Map
                google={google}
                zoom={7}
                initialCenter={{ lat: latitude, lng: longitude}}
                center={{ lat: latitude, lng: longitude}}
              >
                <Marker position={{ lat: latitude, lng: longitude}} />
              </Map>
            </MapViewDiv>
          </MapViewWrapper>
        )}

      </CardContentWrapper>
    </CardView>
  )
}


const CardContentWrapper = styled(CardContent)`
  &&&& {
    padding: 0;
  }
`
const MapViewDiv = styled.div`
  width: 100%;
  min-width: 300px;
  height: 300px;
`

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
`

const CardView = styled(Card)`
  &&&& {
    width: 100%;
    min-width: 100%;
    height: 500px;
  }
`
export default GoogleApiWrapper({
  apiKey: googleKey
})(MapViewComponent);
