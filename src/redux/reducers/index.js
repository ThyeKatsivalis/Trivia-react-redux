import { combineReducers } from 'redux';
import user from './user';
import api from './api';
import player from './player';

const rootReducer = combineReducers({
  user,
  api,
  player,
});

export default rootReducer;
