const profile = (state = { show: false }, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE':
      return Object.assign({}, state, {
        show: true,
      });
    case 'EXIT_PROFILE':
      return Object.assign({}, state, {
        show: false,
      });
    case 'UPDATE_NAME':
      return Object.assign({}, state, {
        name: action.name,
      });
    case 'UPDATE_TITLE':
      return Object.assign({}, state, {
        title: action.title,
      });
    default:
      return state;
  }
};

export default profile;
