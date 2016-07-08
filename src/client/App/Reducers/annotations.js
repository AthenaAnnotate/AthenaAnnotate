const annotation = (state, action) => {
  switch (action.type) {
    case 'LOAD_ANNOTATIONS':
      return {
        id: state.id,
        body: state.text,
        target: state.exact,
        doc_id: state.DocId,
        url: state.url,
        edit: false,
        deleteFail: false,
        userName: state.User.name,
        userTitle: state.User.title,
        userId: state.User.id,
        userImage: state.User.picture,
        privacySetting: state.private ? 'Private' : 'Public',
        groupSetting: state.groupId || -1,
      };
    case 'DELETE_ANNOTATION':
      if (state.id !== action.id) {
        return true;
      }
      return false;
    case 'EDIT_ANNOTATION':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        edit: !state.edit,
      });
    case 'SAVE_EDIT':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        body: action.body,
        edit: !state.edit,
      });
    case 'DELETE_BODY':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        body: null,
        edit: !state.edit,
      });
    case 'DELETE_BODY_FAIL':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        deleteFail: true,
      });
    default:
      return state;
  }
};

const annotations = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ANNOTATIONS':
      return action.annotations.map(a =>
        annotation(a, action)
      );
    case 'DELETE_ANNOTATION':
      return state.filter(a =>
        annotation(a, action)
      );
    case 'EDIT_ANNOTATION':
      return state.map(a =>
        annotation(a, action)
      );
    case 'SAVE_EDIT':
      return state.map(a =>
        annotation(a, action)
      );
    case 'DELETE_BODY':
      return state.map(a =>
        annotation(a, action)
      );
    case 'DELETE_BODY_FAIL':
      return state.map(a =>
        annotation(a, action)
      );
    case 'LOG_OUT':
      return [];
    default:
      return state;
  }
};

export default annotations;
