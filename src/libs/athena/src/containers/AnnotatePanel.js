import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import AnnotatePanel from '../components/AnnotatePanel';

const mapStateToProps = (state) => ({
  user: state.user,
  widget: state.widget,
  annotation: state.annotation,
  annotations: state.annotations,
  exact: state.annotation.target.exact,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnnotatePanel);
