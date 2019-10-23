/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Types from '../../store/crimes/types';
import Map from '../../components/Map';
import { usePosition } from '../../hooks/usePosition';
import Navbar from '../../components/Navbar';
import AddIncidentModal from '../../components/AddIncidentModal';
import IncidentThumbnail from './components/Incident';
import CrimeList from './components/CrimeList';

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
    .slice(0, 5);

  const mostCommentedCrimes = crimes
    .sort((a, b) => {
      if (a.comments && b.comments)
        return a.comments.length < b.comments.length ? 1 : -1;
      return -1;
    })
    .slice(0, 5);

  const mostViewedCrimes = crimes
    .sort((a, b) => {
      if (a.views && b.views) {
        return a.views.length < b.views.length ? 1 : -1;
      }
      return -1;
    })
    .slice(0, 5);

  const mostVotedCrimes = crimes
    .sort((a, b) => {
      if (a.votes && b.votes)
        return a.votes.length < b.votes.length ? 1 : -1;
      return -1;
    })
    .slice(0, 5);

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);

    if (latitude && longitude && user) {
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

  const padZero = (str, len) => {
    const length = len || 2;
    const zeros = new Array(length).join('0');
    return (zeros + str).slice(-length);
  };

  const invertColor = (hex, bw) => {
    let cloneHex = hex.slice(0);
    if (cloneHex.indexOf('#') === 0) {
      cloneHex = cloneHex.slice(1);
    }
    // convert 3-digit cloneHex to 6-digits.
    if (cloneHex.length === 3) {
      cloneHex =
        cloneHex[0] +
        cloneHex[0] +
        cloneHex[1] +
        cloneHex[1] +
        cloneHex[2] +
        cloneHex[2];
    }
    if (cloneHex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r = parseInt(cloneHex.slice(0, 2), 16);
    let g = parseInt(cloneHex.slice(2, 4), 16);
    let b = parseInt(cloneHex.slice(4, 6), 16);
    if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return r * 0.299 + g * 0.587 + b * 0.114 > 186
        ? '#000000'
        : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
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
                      color={invertColor(
                        intToRGB(hashCode(incident.type)),
                      )}
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
              <IncidentMetaDisplay color="teal">
                <h3>Most Viewed Incidents</h3>
                {mostViewedCrimes.map(crime => (
                  <CrimeList key={crime._id} crime={crime} />
                ))}
              </IncidentMetaDisplay>
              <IncidentMetaDisplay color="purple">
                <h3>Most Commented Incidents</h3>
                {mostCommentedCrimes.map(crime => (
                  <CrimeList key={crime._id} crime={crime} />
                ))}
              </IncidentMetaDisplay>

              <IncidentMetaDisplay color="black">
                <h3>Most Voted Incidents</h3>
                {mostVotedCrimes.map(crime => (
                  <CrimeList key={crime._id} crime={crime} />
                ))}
              </IncidentMetaDisplay>
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
  display: flex;
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
  max-height: 699.5px;
  overflow: hidden;
`;

const IncidentDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const IncidentMetaDisplay = styled.div`
  padding: 2rem;
  background: #ffffff;
  width: 33.33%;
  margin: 2rem;
  box-shadow: 1px 1px 10px ${props => props.color};
`;

export default MapView;
