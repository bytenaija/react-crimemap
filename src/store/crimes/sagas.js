import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import DataTypes from './types';
import constants from '../../constants';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://crimemap-apiv2.herokuapp.com/api'
    : 'http://localhost:5009/api';

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
    yield put({
      type: DataTypes.ALERT_DANGER,
      payload: action.payload,
    });
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

export const addCrime = async data => {
  const user = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE_NAME),
  );
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

const getCrime = async id => {
  const user = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE_NAME),
  );
  const response = await axios.get(`${API_BASE_URL}/crimes/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data.crime;
};

export function* getCrimeStart(action) {
  try {
    yield put({ type: DataTypes.GET_CRIME_START });
    const crime = yield call(getCrime, action.payload);
    yield put({ type: DataTypes.GET_CRIME_SUCCESS, payload: crime });
  } catch (err) {
    yield put({
      type: DataTypes.GET_CRIME_FAILURE,
      payload: err,
    });
  }
}

const addVote = async payload => {
  const user = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE_NAME),
  );
  const { incidentId, vote } = payload;
  const response = await axios.get(
    `${API_BASE_URL}/crimes/${incidentId}/${vote}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  if (response.data.success) {
    return response.data.crime;
  }
  throw response.data.message;
};

export function* voteStart(action) {
  try {
    yield put({ type: DataTypes.VOTE_START });
    const crime = yield call(addVote, action.payload);
    yield put({
      type: DataTypes.VOTE_SUCCESS,
      payload: crime,
    });
  } catch (err) {
    yield put({
      type: DataTypes.VOTE_FAILURE,
      payload: err,
    });
  }
}

const addComment = async payload => {
  const user = JSON.parse(
    localStorage.getItem(constants.LOCAL_STORAGE_NAME),
  );
  const { incidentId, comment } = payload;
  const response = await axios.post(
    `${API_BASE_URL}/crimes/${incidentId}/comment`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  if (response.data.success) {
    return response.data.crime;
  }
  throw response.data.message;
};

export function* commentStart(action) {
  try {
    yield put({ type: DataTypes.ADD_COMMENT_START });
    const crime = yield call(addComment, action.payload);
    yield put({
      type: DataTypes.ADD_COMMENT_SUCCESS,
      payload: crime,
    });
  } catch (err) {
    yield put({
      type: DataTypes.ADD_COMMENT_FAILURE,
      payload: err,
    });
  }
}

export function* watchGetDataStart() {
  yield takeEvery(DataTypes.GET_CRIMES, fetchDataStart);
  yield takeEvery(DataTypes.ALERT_CRIME, alertCrime);
  yield takeEvery(DataTypes.ADD_NEW_INCIDENT, addNewIncident);
  yield takeEvery(DataTypes.ADD_CRIME, addCrimeToDatabase);
  yield takeEvery(DataTypes.GET_CRIME, getCrimeStart);
  yield takeEvery(DataTypes.VOTE, voteStart);
  yield takeEvery(DataTypes.ADD_COMMENT, commentStart);
}
