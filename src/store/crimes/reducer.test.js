import reducer from './reducer';
import DataTypes from './types';

describe('StateDataReducer', () => {
  const stateName = 'Lagos';
  const description = 'Lagos is a state';
  const budgetSize = [200, 300];
  const economicData = [{ budgetSize: 500, inflationRate: 700 }];
  const demographicData = [{ outOfSchool: 500 }];
  const inflationRate = [500, 700];
  const povertyRate = [500, 700];
  const outOfSchool = [500, 700];
  const currentGovernor = 'Jide';
  const stateCapital = 'Ikeja';
  const areaSqKm = 33900303;
  const numberOfStates = 36;
  const areaRank = '2nd';
  const email = 'jide@john.com';
  const website = 'http://www.google.com';
  const staticId = '12345';
  const countryName = 'Nigeria';

  const initialState = {
    data: {
      staticId: '',
      countryName: '',
      stateName: '',
      description: '',
      economicData: [],
      demographicData: [],
      economic: {
        inflationRate: [],
        budgetSize: [],
        povertyRate: [],
      },
      demographic: {
        outOfSchool: [],
      },
      currentGovernor: '',
      stateCapital: '',
      areaSqKm: 0,
      numberOfStates: 0,
      areaRank: '',
      email: '',
      website: '',
    },
    loading: false,
    error: undefined,
  };
  it('returns the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle GET_DATA', () => {
    let result = initialState;
    result = { ...result, loading: true };

    expect(
      reducer(initialState, {
        type: DataTypes.GET_DATA,
      }),
    ).toEqual(result);
  });

  it('should handle GET_DATA_START', () => {
    let result = initialState;
    result = { ...result, loading: true };

    expect(
      reducer(initialState, {
        type: DataTypes.GET_DATA_START,
      }),
    ).toEqual(result);
  });

  it('should handle GET_DATA_SUCCESS', () => {
    const data = {
      stateName,
      description,
      economicData,
      demographicData,
      economic: {
        budgetSize,
        inflationRate,
        povertyRate,
      },
      demographic: {
        outOfSchool,
      },
      currentGovernor,
      stateCapital,
      areaSqKm,
      numberOfStates,
      areaRank,
      email,
      website,
      staticId,
      countryName,
    };
    let result = { ...initialState };
    result = { ...result, loading: false, data };

    expect(
      reducer(initialState, {
        type: DataTypes.GET_DATA_SUCCESS,
        payload: data,
      }),
    ).toEqual(result);
  });
});
