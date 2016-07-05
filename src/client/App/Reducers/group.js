const group = (state = { showGroups: false, loaded: false }, action) => {
  switch (action.type) {
    case 'LOAD_GROUPS':
      return Object.assign({}, state, {
        groups: action.groups,
        loaded: true,
      });
    case 'EDIT_GROUP_NAME':
      return Object.assign({}, state, {
        edit: action.edit,
      });
    case 'SET_GROUP':
      return Object.assign({}, state, {
        selected: action.groupId,
        loaded: false,
      });
    case 'SHOW_GROUPS':
      return Object.assign({}, state, {
        showGroups: !state.showGroups,
      });
    case 'SHOW_MODAL':
      return Object.assign({}, state, {
        edit: '',
      });
    case 'SHOW_INFO':
      return Object.assign({}, state, {
        info: action.info,
      });
    default:
      return state;
  }
};

export default group;
