import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Types from '../../store/crimes/types';

const IncidentView = ({ match }) => {
  const dispatch = useDispatch();
  const incident = useSelector(state => state.Crimes.currentCrime);
  useEffect(() => {
    const { incidentId } = match.params;
    dispatch({ type: Types.GET_CRIME, payload: incidentId });
  }, [dispatch, match]);

  return <div>{incident.type}</div>;
};
export default IncidentView;
