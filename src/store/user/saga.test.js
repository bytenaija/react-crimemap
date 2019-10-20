import { takeEvery, put } from 'redux-saga/effects';
import { fetchDataStart, watchGetDataStart } from './sagas';
import DataTypes from './types';

describe('StateDataSaga', () => {
  const fetchCallCountries = jest.fn(() => ({
    Nigeria: [{ name: 'Edo', id: 2303 }],
  }));
  it('should return the right effect', () => {
    const watcherSaga = watchGetDataStart();
    const result = watcherSaga.next().value;
    const result2 = takeEvery(DataTypes.GET_DATA, fetchDataStart);
    expect(result).toEqual(result2);
  });
  it('should return the right effect when starting data fetch', () => {
    const watcherSaga = fetchDataStart('1234');
    const result = watcherSaga.next().value;
    const result2 = put({ type: DataTypes.GET_DATA_START });
    expect(result).toEqual(result2);
  });

  it('should return the right effect when data fetch is successful', () => {
    const watcherSaga = fetchDataStart('1234');
    const result = watcherSaga.next().value;
    const test1 = put({ type: DataTypes.GET_DATA_START });

    const result3 = watcherSaga.next().value;

    const result4 = watcherSaga.next().value;
    const test2 = put({ type: DataTypes.GET_DATA_SUCCESS });

    expect(result4).toEqual(test2);
  });

  it('should fetch data', () => {
    const action = takeEvery(DataTypes.GET_DATA, fetchDataStart, {
      payload: { state: '1234' },
    });
    const workerSaga = fetchDataStart(action.payload.args);
  });
});
