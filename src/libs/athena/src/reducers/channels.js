import * as types from '../constants/actionTypes';

const channels = (
  state = {
    groups: [],
    users: [],
  },
  action
) => {
  switch (action.type) {
    case types.ADD_GROUPS:
      return Object.assign({}, state, {
        groups: action.groups,
      });
    case types.ADD_USERS:
      return Object.assign({}, state, {
        users: action.users,
      });
    default:
      return state;
  }
};

export default channels;
