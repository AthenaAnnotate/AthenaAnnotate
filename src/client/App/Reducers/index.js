import { combineReducers } from 'redux';
import annotations from './annotations';
import docs from './docs';
import editor from './editor';
import loading from './loading';
import listView from './listView';
import filter from './filter';
import following from './following';
import group from './group';
import modal from './modal';
import user from '../../../libs/athena/src/reducers/user';

const Reducers = combineReducers({
  docs,
  annotations,
  editor,
  loading,
  listView,
  user,
  filter,
  following,
  group,
  modal,
});

export default Reducers;
