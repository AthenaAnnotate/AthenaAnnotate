import { connect } from 'react-redux';
import Editor from '../Components/Editor';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    editor: state.editor,
    group: state.group,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    editText: (body) => {
      dispatch(actions.editText(body));
    },
    updateGroup: (groupId, groupName) => {
      dispatch(actions.updateGroup(groupId, groupName));
    },
    updatePrivacy: (bool) => {
      dispatch(actions.updatePrivacy(bool));
    },
  }
);

const BodyEditor = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Editor);

export default BodyEditor;
