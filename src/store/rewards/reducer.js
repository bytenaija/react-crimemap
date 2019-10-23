import DataTypes from './types';

const INITIAL_STATE = {
  rewards: [],
  currentReward: {},
  loading: false,
  error: undefined,
};

const rewardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataTypes.REWARD_CREATE_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case DataTypes.REWARD_CREATE_SUCCESS:
      return {
        ...state,
        rewards: [...state.rewards, action.payload],
        loading: false,
        error: undefined,
      };

    case DataTypes.REWARD_CREATE_FAILUE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DataTypes.GET_CURRENT_REWARD:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case DataTypes.GET_CURRENT_REWARD_SUCCESS:
      return {
        ...state,
        currentReward: action.payload,
        isAuthenticated: true,
      };

    case DataTypes.GET_CURRENT_REWARD_FAILUE:
      return {
        ...state,
        loading: false,
        currentReward: {},
        error: action.payload,
      };

    case DataTypes.GET_REWARD_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case DataTypes.GET_REWARD_SUCCESS:
      return {
        ...state,
        loading: true,
        error: undefined,
        rewards: action.payload,
      };

    case DataTypes.GET_REWARD_FAILURE:
      return {
        ...state,
        loading: true,
        error: undefined,
        rewards: action.payload,
      };

    default:
      return state;
  }
};
export default rewardReducer;
