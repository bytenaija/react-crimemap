import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import CrimeReducer from './crimes/reducer';
import UserReducer from './user/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Crimes', 'User'],
};

const rootReducer = combineReducers({
  Crimes: CrimeReducer,
  User: UserReducer,
});

export default persistReducer(persistConfig, rootReducer);
