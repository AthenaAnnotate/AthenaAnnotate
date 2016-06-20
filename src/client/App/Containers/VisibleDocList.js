import { connect } from 'react-redux';
import DocList from '../Components/DocList';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    docs: state.docs,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onDocDelete: (id) => {
      dispatch(actions.deleteDoc(id));
    },
  }
);

const VisibleDocList = connect(
	mapStatetoProps,
	mapDispatchToProps
)(DocList);

export default VisibleDocList;