import * as types from '../constants/actionTypes';

const channels = (
  state = {
    current: '',
    channels: [],
  },
  action
) => {
  switch (action.type) {
    case types.SET_CURRENT_CHANNEL:
      return Object.assign({}, state, {
        current: action.current,
      });
    case types.SET_GROUPS:
      return Object.assign({}, state, {
        groups: action.groups,
      });
    case types.SET_USERS:
      return Object.assign({}, state, {
        users: action.users,
      });
    case types.SET_CHANNELS:
      return Object.assign({}, state, {
        current: action.channels.current,
        channels: action.channels.channels,
      });
    default:
      return state;
  }
};

export default channels;
