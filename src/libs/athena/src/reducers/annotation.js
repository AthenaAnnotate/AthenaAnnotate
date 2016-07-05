import * as types from '../constants/actionTypes';

const annotation = (
  state = {
    body: {
      lastModified: '',
      text: '',
    },
    target: {
      source: '',
      selector: {
        exact: '',
        prefix: '',
        suffix: '',
      },
    },
    private: false,
    groupId: null,
  },
  action
) => {
  switch (action.type) {
    case types.SET_ANNOTATION:
      return action.annote;
    case types.CLEAR_ANNOTATION:
      return Object.assign({}, state, {
        body: {
          lastModified: '',
          text: '',
        },
        target: {
          source: '',
          selector: {
            exact: '',
            prefix: '',
            suffix: '',
          },
        },
        private: false,
        groupId: null,
      });
    case types.UPDATE_BODY:
      return Object.assign({}, state, {
        body: {
          lastModified: Date.now(),
          text: action.text,
        },
      });
    case types.SET_TARGET:
      return Object.assign({}, state, {
        target: action.selector,
      });
    case types.SET_PRIVACY:
      return Object.assign({}, state, {
        private: action.private,
      });
    case types.SET_GROUP:
      return Object.assign({}, state, {
        groupId: action.groupId,
      });
    default:
      return state;
  }
};

export default annotation;
