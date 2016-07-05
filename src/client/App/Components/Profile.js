import React, { PropTypes } from 'react';

const Profile = ({ user, profile, invites, exitProfile, acceptInvite, group, following, setGroup, setFilter, setUser, updateName, updateTitle, updateProfile }) => {
  const invitesList = invites.invites.map(invite => (
    <li key={invite.id}>
      <span>{invite.sentFrom} has invited you to join {invite.GroupId}.</span>
      <button onClick={() => acceptInvite(invite.GroupId, user.id, true)}>Acccept</button>
      <button onClick={() => acceptInvite(invite.GroupId, user.id,  false)}>Decline</button>
    </li>
  ));
  const groupList = group.groups.map(grp => (
    <li key={grp.id}>
      <a
        onClick={() => {
          setGroup(grp.id);
          setFilter('Groups');
        }}
      >
        {grp.name}
      </a>
    </li>
  ));
  const followList = following.users.map(followedUser => (
    <li key={followedUser.id}>
      <a
        onClick={() => {
          setUser(followedUser.id);
          setFilter('User');
        }}
      >
        {followedUser.name}
      </a>
    </li>
  ));
  const style = {
    backgroundImage: `url(${user.facebook.picture})`,
  };
  return (
    <div className="col-md-9">
      <div
        className="circle profilePic"
        style={style}
        alt="Profile"
      />
      <form className="profile">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" defaultValue={user.facebook.name} onChange={(e) => updateName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" defaultValue={user.title} onChange={(e) => updateTitle(e.target.value)} />
        </div>
        <button
          type="submit"
          className="btn btn-default"
          onClick={(e) => {
            e.preventDefault();
            updateProfile(profile.name, profile.title, user.id);
          }}
        >
          Save
        </button>
        <button
          className="btn btn-default"
          onClick={(e) => {
            e.preventDefault();
            exitProfile();
          }}
        >
          Cancel
        </button>
      </form>
      <div>
        <div>
          <h5>Pending Invitations:</h5>
          <ul>
            {invitesList}
          </ul>
        </div>
        <div>
          <h5>Following:</h5>
          <ul>
            {followList}
          </ul>
        </div>
        <div>
          <h5>Groups:</h5>
          <ul>
            {groupList}
          </ul>
        </div>

      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  invites: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  following: PropTypes.object.isRequired,
  exitProfile: PropTypes.func.isRequired,
  acceptInvite: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default Profile;
