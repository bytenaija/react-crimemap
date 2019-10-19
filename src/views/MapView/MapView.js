import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { usePosition } from "../../hooks/usePosition";
import { useSelector, useDispatch } from "react-redux";
import Types from "../../store/crimes/types";

export const MapView = () => {
  const crimes = useSelector(state => state.Crimes.crimes);
  const dangerAlertCrimes = useSelector(state => state.Crimes.dangerAlertCrimes);
  const dispatch = useDispatch();
  const { latitude, longitude } = usePosition();

  useEffect(() => {
    const socket = socketIOClient("http://localhost:5009");
    // socket.emit("update-location", {
    //   userId: "5da82087c3667279b8ff98c7",
    //   longitude: longitude,
    //   latitude: latitude
    // });

    socket.on("alarm", data => {
      dispatch({ type: Types.ALERT_CRIME, payload: data.crimes });
    });

     dispatch({ type: Types.GET_CRIMES });

  }, [dispatch, latitude, longitude]);

  return (
    <div className="App">
      {dangerAlertCrimes.length > 0 && <div>Danger</div>}
      {!dangerAlertCrimes.length && (
        <header className="App-header">
          Current Location: {latitude + " , " + longitude}
          <br />
          Crimes within 10km of current locations:{" "}
          {crimes.map(crime => (
            <div>
              <h2>Type: {crime.type}</h2>
            </div>
          ))}
        </header>
      )}
    </div>
  );
};

export default MapView;
