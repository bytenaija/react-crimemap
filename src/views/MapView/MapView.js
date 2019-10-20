import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { usePosition } from '../../hooks/usePosition';
import Types from '../../store/crimes/types';
import Map from '../../components/Map';
import { CrimeList } from './components/CrimeList';
import Navbar from '../../components/Navbar';
import AddIncidentModal from '../../components/AddIncidentModal';

export const MapView = () => {
  const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://crimemap-apiv2.herokuapp.com/'
    : 'http://localhost:5009/';
  const crimes = useSelector((state) => state.Crimes.crimes);
  const user = useSelector(state => state.User.user);
  const dangerAlertCrimes = useSelector(
    (state) => state.Crimes.dangerAlertCrimes,
  );
  const dispatch = useDispatch();
  const { latitude, longitude } = usePosition();

  
  useEffect(() => {
    console.log(latitude, longitude);
    const socket = socketIOClient(BASE_URL);
    socket.emit('update-location', {
      userId: user.id,
      longitude,
      latitude,
    });

    socket.on('alarm', (data) => {
      dispatch({ type: Types.ALERT_CRIME, payload: data.crimes });
    });

    dispatch({ type: Types.GET_CRIMES });
  }, [latitude, longitude]);

  return (
    <MapviewWrapper>
      <Navbar />
      {dangerAlertCrimes.length > 0 && <div>Danger</div>}
      {!dangerAlertCrimes.length && (
        <header>
          <Map center={{ latitude, longitude }} crimes={crimes} />
          <MapviewInnerWrapper>
            {crimes.map((crime) => (
              <CrimeList crime={crime} key={crime._id} />
            ))}
          </MapviewInnerWrapper>
        </header>
      )}

      <AddIncidentModal />
    </MapviewWrapper>
  );
};

const MapviewWrapper = styled.div``;
const MapviewInnerWrapper = styled.div`
  padding: 1rem;
`;

export default MapView;
