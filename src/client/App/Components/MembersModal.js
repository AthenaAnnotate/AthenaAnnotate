import React, { PropTypes } from 'react';

const membersModal = ({
  group,
  showModal,
  search,
  selectUser,
  user,
  searchUsers,
  deselectUser,
  inviteUsers,
}) => {
  const members = group.info.members.map(member => (
    <li key={member.id}>
      <a>
        {member.name}
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
      <h4>Group Administrator</h4>
      <span>{group.info.creator}</span>
      <h4>Members</h4>
      <ul>
        {members}
      </ul>
      <label htmlFor="addUsers">Add users to group</label>
      <input
        id="addUsers"
        type="text"
        placeholder="Enter a name"
        onChange={(e) => searchUsers(e.target.value, user.id)}
      />
      {search.users.length === 0
        ?
        null
        :
        <ul>
          {userList}
        </ul>
      }
      {search.selected.length === 0
        ?
        null
        :
        <div>
          <div>Selected Users</div>
          <ul>
            {selectedUserList}
          </ul>
          <button onClick={() => inviteUsers(search.selected, group.selected, user.facebook.name)}>
            Invite
          </button>
        </div>
      }
      <button className="btn btn-default" onClick={() => showModal()}>Cancel</button>
    </div>
  );
};

membersModal.propTypes = {
  user: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  selectUser: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  deselectUser: PropTypes.func.isRequired,
  inviteUsers: PropTypes.func.isRequired,
};

export default membersModal;
