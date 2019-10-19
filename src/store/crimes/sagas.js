import {
  takeEvery,
  call,
  put,
} from 'redux-saga/effects'
import axios from 'axios'
import DataTypes from './types'

const API_BASE_URL = process.env.STATE_DATA_API_URL || 'http://localhost:5009/api'

export const fetchAllData = async (state) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/crimes/`
    )

    console.log("hdhdhdhdhdhdhdh", response)
    return response.data.crimes
  } catch (error) {
    throw error
  }
}

export function* fetchDataStart(
  action
){
  try {
    yield put({ type: DataTypes.GET_CRIMES_START })

    const state = yield call(fetchAllData)

    yield put({
      type: DataTypes.GET_CRIMES_SUCCESS,
      payload: state
    })
  } catch (err) {
    yield put({
      type: DataTypes.GET_CRIMES_FAILURE,
      payload: err
    })
  }
}


export function* alertCrime(
  action
){
  try {
    yield put({ type: DataTypes.ALERT_DANGER, payload: action.payload})

  } catch (err) {
    yield put({
      type: DataTypes.GET_CRIMES_FAILURE,
      payload: err
    })
  }
}

export function* watchGetDataStart() {
  yield takeEvery(DataTypes.GET_CRIMES, fetchDataStart)
  yield takeEvery(DataTypes.ALERT_CRIME, alertCrime)
}
