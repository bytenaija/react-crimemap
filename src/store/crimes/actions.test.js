import { fetchData } from './actions'
import DataType from './types'

describe('StateDataActions', () => {
  const stateParams = '1234'
  const result = { type: DataType.GET_DATA, payload: stateParams }
  it('returns the right type', () => {
    const state = fetchData('1234')
    expect(state).toEqual(result)
  })
})
