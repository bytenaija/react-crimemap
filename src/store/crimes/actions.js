/* eslint-disable import/prefer-default-export */
import DataTypes from './types'

export const fetchCrimes = () => {
  return {
    type: DataTypes.GET_CRIMES,
  }
}
