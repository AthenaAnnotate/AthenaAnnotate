import * as types from '../constants/actionTypes';

const widget = (
  state = {
    display: 'HIDE',
    isOnModify: false,
  },
  action
) => {
  switch (action.type) {
    case types.SET_WIDGET:
      return Object.assign({}, state, {
        display: action.display,
      });
    case types.SET_WIDGET_MODIFY:
      return Object.assign({}, state, {
        isOnModify: action.isOnModify,
      });
    default:
      return state;
  }
};

export default widget;
