import DataTypes from "./types";


const INITIAL_STATE = {
  crimes: [],
  dangerAlertCrimes: [],
  loading: false,
  error: undefined,
  recentCrimes: []
};

const crimeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataTypes.GET_CRIMES:
      return { ...state, loading: true, error: undefined };

    case DataTypes.GET_CRIMES_START:
      return { ...state, loading: true, error: undefined };

    case DataTypes.ALERT_DANGER:
      return { ...state, dangerAlertCrimes: action.payload };

    case DataTypes.GET_CRIMES_SUCCESS:
      return { ...state, loading: false, crimes: action.payload };

    case DataTypes.GET_CRIMES_FAILURE:
      return { ...state, loading: false, error: action.error };

    case DataTypes.RECIEVED_RECENT_CRIME:
      return {
        ...state,
        recentCrimes: [...state.recentCrimes, action.payload],
        crimes: [...state.crimes, action.payload]
      };

    default:
      return state;
  }
};
export default crimeReducer;
