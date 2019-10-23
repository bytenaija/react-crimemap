import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import DataTypes from './types';
import constants from '../../constants';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://crimemap-apiv2.herokuapp.com/api'
    : 'http://localhost:5009/api';

export const addReward = async rewardInfo => {
  const user = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE_NAME),
  );
  const response = await axios.post(
    `${API_BASE_URL}/rewards/`,
    rewardInfo,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  const { reward, success, message } = response.data;
  console.log('Reponse tarrs', response);
  if (success) {
    return reward;
  }
  throw message;
};

export const getRewards = async () => {
   const user = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE_NAME),
  );
  const response = await axios.get(
    `${ API_BASE_URL }/rewards/`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  if (response.data.success) {
    const { rewards } = response.data;
    return rewards;
  }
  throw response.data.message;
};

export function* addRewardStart(action) {
  try {
    yield put({ type: DataTypes.REWARD_CREATE_START });

    const reward = yield call(addReward, action.payload);
    console.log('addRewards tarrs', reward);

    yield put({
      type: DataTypes.REWARD_CREATE_SUCCESS,
      payload: reward,
    });
  } catch (err) {
    yield put({
      type: DataTypes.REWARD_CREATE_FAILUE,
      payload: err,
    });
  }
}

export function* getRewardStart(action) {
  try {
    yield put({ type: DataTypes.GET_REWARD_START});

    const rewards = yield call(getRewards, action.payload);

    yield put({
      type: DataTypes.GET_REWARD_SUCCESS,
      payload: rewards,
    });
  } catch (err) {
    yield put({
      type: DataTypes.GET_REWARD_FAILUE,
      payload: err,
    });
  }
}

const getCurrentReward = async (id) => {
  const user = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE_NAME),
  );
  const response = await axios.get(
    `${ API_BASE_URL }/rewards/${id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  if (response.data.success) {
    const { reward } = response.data;
    return reward;
  }
  throw response.data.message;
}

export function* getCurrentRewardStart(action) {
  try {
    yield put({ type: DataTypes.GET_CURRENT_REWARD_START});

    const rewards = yield call(getCurrentReward, action.payload);

    yield put({
      type: DataTypes.GET_CURRENT_REWARD_SUCCESS,
      payload: rewards,
    });
  } catch (err) {
    yield put({
      type: DataTypes.GET_CURRENT_REWARD_FAILUE,
      payload: err,
    });
  }
}

export function* watchRewardSaga() {
  yield takeEvery(DataTypes.REWARD_CREATE, addRewardStart);
  yield takeEvery(DataTypes.GET_REWARD, getRewardStart);
  yield takeEvery(DataTypes.GET_CURRENT_REWARD, getCurrentRewardStart);
}
