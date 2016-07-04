import { combineReducers } from 'redux';
import user from './user';
import error from './error';
import adder from './adder';
import widget from './widget';
import annotation from './annotation';
import annotations from './annotations';
import channels from './channels';

export default combineReducers({
  user,
  error,
  adder,
  widget,
  annotation,
  annotations,
  channels,
});
