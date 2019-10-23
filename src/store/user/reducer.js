import DataTypes from './types';

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false,
  loading: false,
  error: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: undefined,
        isAuthenticated: false,
      };

    case DataTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: undefined,
      };

    case DataTypes.LOGIN_FAILUE:
      return {
        ...state,
        loading: false,
        user: {},
        isAuthenticated: false,
        error: action.payload,
      };

    case DataTypes.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: undefined,
        isAuthenticated: false,
      };

    case DataTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case DataTypes.REGISTER_FAILUE:
      return {
        ...state,
        loading: false,
        user: {},
        isAuthenticated: false,
        error: action.payload,
      };

    case DataTypes.LOGOUT_START:
      return {
        ...state,
        loading: false,
        error: undefined,
        isAuthenticated: false,
        user: {},
      };

    default:
      return state;
  }
};
export default userReducer;
