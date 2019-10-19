import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import CrimeReducer from './crimes/reducer'


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['data', 'CountryLists']
}

const rootReducer = combineReducers({
  Crimes: CrimeReducer,
})

export default persistReducer(persistConfig, rootReducer)
