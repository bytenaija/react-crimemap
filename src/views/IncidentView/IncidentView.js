import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Types from '../../store/crimes/types';
import Navbar from '../../components/Navbar';
import Map from '../../components/Map';
import { usePosition } from '../../hooks/usePosition';
import AddIncidentModal from '../../components/AddIncidentModal';


const IncidentView = ({ match }) => {
  const dispatch = useDispatch();
  const incident = useSelector(state => state.Crimes.currentCrime);
  const { latitude, longitude } = usePosition();
  useEffect(() => {
    const { incidentId } = match.params;
    dispatch({ type: Types.GET_CRIME, payload: incidentId });
  }, [dispatch, match]);

  return (
    <div>
      <Navbar />
      <div>
        <Map
          zoom={14}
          crimes={[incident]}
          center={{ latitude, longitude }}
        />
      </div>
      <AddIncidentModal />
    </div>
  );
};
export default IncidentView;
