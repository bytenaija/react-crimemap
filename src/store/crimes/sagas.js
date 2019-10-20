import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import DataTypes from './types';
import { constants } from '../../constants';

const API_BASE_URL = process.env.STATE_DATA_API_URL || 'http://localhost:5009/api';

export const fetchAllData = async () => {
  const response = await axios.get(`${API_BASE_URL}/crimes/`);
  return response.data.crimes;
};

export function* fetchDataStart() {
  try {
    yield put({ type: DataTypes.GET_CRIMES_START });

    const state = yield call(fetchAllData);

    yield put({
      type: DataTypes.GET_CRIMES_SUCCESS,
      payload: state,
    });
  } catch (err) {
    yield put({
      type: DataTypes.GET_CRIMES_FAILURE,
      payload: err,
    });
  }
}

export function* alertCrime(action) {
  try {
    yield put({ type: DataTypes.ALERT_DANGER, payload: action.payload });
  } catch (err) {
    yield put({
      type: DataTypes.GET_CRIMES_FAILURE,
      payload: err,
    });
  }
}

export function* addNewIncident(action) {
  try {
    if (action.payload === 'add') {
      yield put({ type: DataTypes.SHOW_ADD_MODAL });
    } else {
      yield put({ type: DataTypes.CLOSE_ADD_MODAL });
    }
  } catch (err) {
    yield put({
      type: DataTypes.GET_CRIMES_FAILURE,
      payload: err,
    });
  }
}

export const addCrime = async (data) => {
  const user = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_NAME));
  const response = await axios.post(`${API_BASE_URL}/crimes/`, data, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data.crime;
};

export function* addCrimeToDatabase(action) {
  try {
    yield put({ type: DataTypes.ADD_CRIME_START });
    const crime = yield call(addCrime, action.payload);
    yield put({ type: DataTypes.ADD_CRIME_SUCCESS, payload: crime });
  } catch (err) {
    yield put({
      type: DataTypes.ADD_CRIME_FAILURE,
      payload: err,
    });
  }
}

export function* watchGetDataStart() {
  yield takeEvery(DataTypes.GET_CRIMES, fetchDataStart);
  yield takeEvery(DataTypes.ALERT_CRIME, alertCrime);
  yield takeEvery(DataTypes.ADD_NEW_INCIDENT, addNewIncident);
  yield takeEvery(DataTypes.ADD_CRIME, addCrimeToDatabase);
}
