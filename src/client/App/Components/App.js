import React, { Component, PropTypes } from 'react';
import Loading from './Loading';
import Sidebar from './Sidebar';
import Splash from './Splash';
import Main from './Main';
import NavBar from './NavBar';
import GroupModal from '../Containers/Modal';
import { initFB, getUserFromFB, getUserStatusFromFB } from '../../../libs/common/auth';

class App extends Component {
  componentDidMount() {
    initFB()
      .then(() => getUserStatusFromFB())
      .then(status => {
        if (status === 'connected') {
          getUserFromFB()
            .then(user => {
              if (user) {
                this.props.actions.getUserFromDB(user);
              }
            });
        }
      });
  }

  componentDidUpdate() {
    if (this.props.user.id) {
      this.props.actions.fetchAnnotations(
        this.props.user.id,
        this.props.filter,
        this.props.group.selected,
        this.props.following.selected
      );
      if (!this.props.following.loaded) {
        this.props.actions.loadFollowingDB(this.props.user.id);
      }
      if (!this.props.group.loaded) {
        this.props.actions.loadGroupsDB(this.props.user.id);
      }
      if (!this.props.invites.loaded) {
        this.props.actions.updateInvites(this.props.user.id);
      }
    }
  }

  render() {
    const {
      user,
      loading,
      filter,
      group,
      profile,
      actions: {
        logout,
        webAppLogin,
        setFilter,
        setGroup,
        leaveGroupDB,
        showGroups,
        createGroup,
        editGroup,
        loadProfile,
        createNewGroup,
      },
    } = this.props;
    return (
      <div className="container">
        <GroupModal />
        <div id="fb-root"></div>
        {
          user && user.id
          ?
            <div className="row">
              <NavBar
                logout={logout}
                user={user}
                loadProfile={loadProfile}
              />
              <Sidebar
                user={user}
                setFilter={setFilter}
                filter={filter}
                group={group}
                leaveGroupDB={leaveGroupDB}
                setGroup={setGroup}
                showGroups={showGroups}
                createGroup={createGroup}
                editGroup={editGroup}
                createNewGroup={createNewGroup}
              />
              {loading ? <Loading /> : <Main profile={profile} user={user} />}
            </div>
          :
            <Splash login={webAppLogin} />
        }
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  filter: PropTypes.string,
  profile: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  invites: PropTypes.object.isRequired,
};

export default App;
