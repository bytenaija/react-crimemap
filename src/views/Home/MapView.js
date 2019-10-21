/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { usePosition } from '../../hooks/usePosition';
import Types from '../../store/crimes/types';
import Map from '../../components/Map';
import CrimeList from './components/CrimeList';
import Navbar from '../../components/Navbar';
import AddIncidentModal from '../../components/AddIncidentModal';
import IncidentThumbnail from './components/Incident';

export const MapView = () => {
  const BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://crimemap-apiv2.herokuapp.com/'
      : 'http://localhost:5009/';
  const crimes = useSelector(state => state.Crimes.crimes);
  const user = useSelector(state => state.User.user);
  const dangerAlertCrimes = useSelector(
    state => state.Crimes.dangerAlertCrimes,
  );
  const dispatch = useDispatch();
  const { latitude, longitude } = usePosition();
  const recentCrimes = crimes
    .sort((a, b) => {
      return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
    })
    .slice(0, 9);

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);

    if (latitude && longitude) {
      dispatch({ type: Types.ALERT_CRIME, payload: [] });
      socket.emit('update-location', {
        userId: user.id,
        longitude,
        latitude,
      });
    }

    socket.on('alarm', data => {
      dispatch({ type: Types.ALERT_CRIME, payload: data.crimes });
    });

    dispatch({ type: Types.GET_CRIMES });
  }, [latitude, longitude, BASE_URL, user.id, dispatch]);

  const hashCode = str => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const intToRGB = i => {
    const c = (i & 0x00ffffff).toString(16).toUpperCase();

    return `#${'00000'.substring(0, 6 - c.length) + c}`;
  };

  return (
    <MapviewWrapper>
      <Navbar />
      {dangerAlertCrimes.length > 0 && <div>Danger</div>}

      {!dangerAlertCrimes.length && (
        <>
          <RecentIncidentsMapWrapper>
            <IncidentWrapper>
              <h2>Recent Incidents</h2>
              <IncidentDisplay>
                {recentCrimes.map(incident => {
                  return (
                    <IncidentThumbnail
                      key={incident._id}
                      incident={incident}
                      color={intToRGB(hashCode(incident.type))}
                    />
                  );
                })}
              </IncidentDisplay>
            </IncidentWrapper>
            <MapWrapper>
              <Map center={{ latitude, longitude }} crimes={crimes} />
            </MapWrapper>
          </RecentIncidentsMapWrapper>
          <div>
            <MapviewInnerWrapper>
              {crimes.map(crime => (
                <CrimeList crime={crime} key={crime._id} />
              ))}
            </MapviewInnerWrapper>
          </div>
        </>
      )}

      <AddIncidentModal />
    </MapviewWrapper>
  );
};

const MapviewWrapper = styled.div``;
const MapviewInnerWrapper = styled.div`
  padding: 1rem;
`;

const RecentIncidentsMapWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MapWrapper = styled.div`
  width: 75%;
`;

const IncidentWrapper = styled.div`
  padding: 0 0.5rem;
  width: 25%;
  background: #ffffff;
  height: 699.5px;
`;

const IncidentDisplay = styled.div`
  display: flex;
`;

export default MapView;
