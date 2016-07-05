import React, { PropTypes } from 'react';

const membersModal = ({
  group,
  showModal,
  search,
  selectUser,
  user,
  searchUsers,
  deselectUser,
}) => {
  const members = group.members.map(member => (
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
      <h4>Creator</h4>
      <span>{group.creator}</span>
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
        <ul className="dropdown-menu autocomplete">
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
  modal: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  deselectUser: PropTypes.func.isRequired,
};

export default membersModal;
