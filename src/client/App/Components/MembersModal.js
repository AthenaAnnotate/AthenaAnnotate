import React, { PropTypes } from 'react';

const membersModal = ({
  group,
  // showModal,
  search,
  selectUser,
  user,
  searchUsers,
  deselectUser,
  inviteUsers,
  // toggleRights,
}) => {
  const members = group.info.members.map(member => (
    <li key={member.data.id}>
      <a>
        {member.data.name}
      </a>
    </li>
  ));
  const userList = search.users.map(u => (
    <li key={u.id}>
      <a onClick={() => selectUser(u.name)}>
        {u.name}
      </a>
    </li>
  ));
  const selectedUserList = search.selected.map(u => (
    <li key={u}>
      <a onClick={() => deselectUser(u)}>
      {u}
      </a>
    </li>
  ));
  return (
    <div>
      <label>Members</label>
      <ul className="search-results">
        {members}
      </ul>
      {search.selected.length === 0
        ?
        null
        :
        <div>
          <label>Invites</label>
          <ul className="search-results">
            {selectedUserList}
          </ul>
        </div>
      }
      <div className="createGroup-input">
        <label htmlFor="addUsers">Add users to group</label>
        <input
          maxLength="200"
          autoComplete="off"
          aria-hidden="true"
          id="addUsers"
          type="text"
          placeholder="Enter a name"
          onChange={(e) => searchUsers(e.target.value, user.id)}
        />
        {search.users.length === 0
          ?
          null
          :
          <ul className="search-results">
            {userList}
          </ul>
        }
      </div>
      {search.selected.length === 0
        ?
        null
        :
        <div>
          <button
            className="btn btn-success btn-xs invite"
            onClick={() => inviteUsers(search.selected, group.selected, user.facebook.name)}
          >
            Invite
          </button>
        </div>
      }
    </div>
  );
};

membersModal.propTypes = {
  user: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  selectUser: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  // showModal: PropTypes.func.isRequired,
  deselectUser: PropTypes.func.isRequired,
  inviteUsers: PropTypes.func.isRequired,
  // toggleRights: PropTypes.func.isRequired,
};

export default membersModal;

// <button className="btn btn-default" onClick={() => showModal()}>Cancel</button>
      // <label>Group Administrator</label>
      // <span>{group.info.creator}</span>
      // <button onClick={() => toggleRights(member.data.id, group.selected, member.rights)}>
      //   {member.rights ? 'REVOKE' : 'GRANT'}
      // </button>
// <button
//   className="btn btn-success btn-xs invite"
//   onClick={() => inviteUsers(search.selected, group.selected, user.facebook.name)}
// >
//   Invite
// </button>
