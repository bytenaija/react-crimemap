import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import CrimeReducer from './crimes/reducer';
import UserReducer from './user/reducer';
import rewardReducer from './rewards/reducer';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['User', 'Reward'],
};

const rootReducer = combineReducers({
  Crimes: CrimeReducer,
  User: UserReducer,
  Reward: rewardReducer
});

export default persistReducer(persistConfig, rootReducer);
