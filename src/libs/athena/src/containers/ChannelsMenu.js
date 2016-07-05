import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ChannelsMenu from '../components/ChannelsMenu';

const mapStateToProps = (state) => ({
  user: state.user,
  channels: state.channels,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsMenu);
