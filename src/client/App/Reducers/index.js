import { combineReducers } from 'redux';
import annotations from './annotations';
import docs from './docs';
import editor from './editor';
import loading from './loading';
import listView from './listView';
import user from './user';

const Reducers = combineReducers({
  docs,
  annotations,
  editor,
  loading,
  listView,
  user,
});

export default Reducers;
