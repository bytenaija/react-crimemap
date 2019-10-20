/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';

export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const options = {
      enableHighAccuracy: true,
    };
    const watcher = geo.watchPosition(onChange, onError, options);
    return () => geo.clearWatch(watcher);
  }, []);
  return { ...position, error };
};
