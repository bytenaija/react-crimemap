import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import DataTypes from './types';
import { constants } from '../../constants';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://crimemap-apiv2.herokuapp.com/api'
  : 'http://localhost:5009/api';

export const login = async (userInfo) => {
  const response = await axios.post(`${API_BASE_URL}/user/login`, userInfo);
  const { user } = response.data;
  localStorage.setItem(constants.LOCAL_STORAGE_NAME, JSON.stringify(user));
  return user;
};

export const register = async (userInfo) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/register`,
      userInfo,
    );
    if (response.data.success) {
      const { user } = response.data;
      localStorage.setItem(constants.LOCAL_STORAGE_NAME, JSON.stringify(user));
      return user;
    }
    throw response.data.message;
  } catch (err) {
    throw err;
  }
};

export function* loginStart(action) {
  try {
    yield put({ type: DataTypes.LOGIN_START });

    const user = yield call(login, action.payload);

    yield put({
      type: DataTypes.LOGIN_SUCCESS,
      payload: user,
    });
  } catch (err) {
    yield put({
      type: DataTypes.LOGIN_FAILUE,
      payload: err,
    });
  }
}

export function* logout() {
  localStorage.removeItem(constants.LOCAL_STORAGE_NAME);
  yield put({ type: DataTypes.LOGOUT_START });
}

export function* registerStart(action) {
  try {
    yield put({ type: DataTypes.REGISTER_START });

    const user = yield call(register, action.payload);

    yield put({
      type: DataTypes.REGISTER_SUCCESS,
      payload: user,
    });
  } catch (err) {
    yield put({
      type: DataTypes.REGISTER_FAILUE,
      payload: err,
    });
  }
}

export function* watchAuthenticationSaga() {
  yield takeEvery(DataTypes.LOGIN, loginStart);
  yield takeEvery(DataTypes.REGISTER, registerStart);
  yield takeEvery(DataTypes.LOGOUT, logout);
}
