import { connect } from 'react-redux';
import Profile from '../Components/Profile';
import * as actions from '../Actions';

const mapStatetoProps = (state) => (
  {
    profile: state.profile,
    user: state.user,
    invites: state.invites,
    group: state.group,
    following: state.following,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    exitProfile: () => {
      dispatch(actions.exitProfile());
    },
    acceptInvite: (group, user, bool) => {
      dispatch(actions.acceptInvite(group, user, bool));
    },
    setGroup: (groupId) => {
      dispatch(actions.setGroup(groupId));
    },
    setFilter: (filter) => {
      dispatch(actions.setFilter(filter));
    },
    setUser: (userId) => {
      dispatch(actions.setUser(userId));
    },
    updateName: (name) => {
      dispatch(actions.updateName(name));
    },
    updateTitle: (title) => {
      dispatch(actions.updateTitle(title));
    },
    updateProfile: (name, title, id) => {
      dispatch(actions.updateProfile(name, title, id));
    },
  }
);

const ProfileEditor = connect(
  mapStatetoProps,
  mapDispatchToProps
)(Profile);

export default ProfileEditor;
