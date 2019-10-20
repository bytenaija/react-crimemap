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
    ? 'https://crimemap-apiv2.herokuapp.com/api'
    : 'http://localhost:5009/api';
  const crimes = useSelector((state) => state.Crimes.crimes);
  const dangerAlertCrimes = useSelector(
    (state) => state.Crimes.dangerAlertCrimes,
  );
  const dispatch = useDispatch();
  const { latitude, longitude } = usePosition();

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    socket.emit('update-location', {
      userId: '5da82087c3667279b8ff98c7',
      longitude,
      latitude,
    });

    socket.on('alarm', (data) => {
      dispatch({ type: Types.ALERT_CRIME, payload: data.crimes });
    });

    dispatch({ type: Types.GET_CRIMES });
  }, [dispatch, latitude, longitude]);

  return (
    <MapviewWrapper>
      <Navbar />
      {dangerAlertCrimes.length > 0 && <div>Danger</div>}
      {!dangerAlertCrimes.length && (
        <header className="App-header">
          <Map center={{ latitude, longitude }} crimes={crimes} />
          {crimes.map((crime) => (
            <CrimeList crime={crime} key={crime._id} />
          ))}
        </header>
      )}

      <AddIncidentModal />
    </MapviewWrapper>
  );
};

const MapviewWrapper = styled.div``;

export default MapView;
