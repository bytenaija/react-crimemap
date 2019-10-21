import DataTypes from './types';

const INITIAL_STATE = {
  crimes: [],
  dangerAlertCrimes: [],
  loading: false,
  error: undefined,
  recentCrimes: [],
  addNewIncident: false,
  success: false,
  currentCrime: {},
};

const crimeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataTypes.GET_CRIMES_START:
      return { ...state, loading: true, error: undefined };

    case DataTypes.ALERT_DANGER:
      return { ...state, dangerAlertCrimes: action.payload };

    case DataTypes.GET_CRIMES_SUCCESS:
      return { ...state, loading: false, crimes: action.payload };

    case DataTypes.GET_CRIMES_FAILURE:
      return { ...state, loading: false, error: action.error };

    case DataTypes.GET_CRIME_START:
      return {
        ...state,
        loading: true,
        error: undefined,
        currentCrime: {},
      };

    case DataTypes.GET_CRIME_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCrime: action.payload,
      };

    case DataTypes.GET_CRIME_FAILURE:
      return { ...state, loading: false, error: action.error };

    case DataTypes.RECIEVED_RECENT_CRIME:
      return {
        ...state,
        recentCrimes: [...state.recentCrimes, action.payload],
        crimes: [...state.crimes, action.payload],
      };

    case DataTypes.ADD_CRIME_SUCCESS:
      return {
        ...state,
        loading: false,
        crimes: [...state.crimes, action.payload],
        success: true,
      };

    case DataTypes.SHOW_ADD_MODAL:
      return { ...state, addNewIncident: true, success: false };

    case DataTypes.CLOSE_ADD_MODAL:
      return { ...state, addNewIncident: false, success: false };

    default:
      return state;
  }
};
export default crimeReducer;
