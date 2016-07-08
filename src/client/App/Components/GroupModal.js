import React, { PropTypes } from 'react';

const createGroupModal = ({
  group,
  user,
  search,
  showModal,
  createGroup,
  editGroup,
  searchUsers,
  selectUser,
  deselectUser,
}) => {
  const userList = search.users.map(u => (
    <li key={u.id}>
      <a onClick={() => selectUser(u.name)}>
        {u.name}
      </a>
    </li>
  ));
  const selectedUserList = search.selected.map(u => (
    <li key={u}>
      <div className="addUser">
        <span>{u}</span>
        <span className="remove glyphicon glyphicon-remove-sign" onClick={() => deselectUser(u)} />
      </div>
    </li>
  ));
  return (
    <div className="createGroup">
      <div className="createGroup-title">
        <h4>Create A New Team</h4>
      </div>
      <form>
        <div className="createGroup-input">
          <label htmlFor="GroupName">Group Name</label>
          <input
            type="text"
            id="GroupName"
            placeholder="Group Name"
            aria-hidden="true"
            autoComplete="off"
            maxLength="99"
            onChange={(e) => {
              e.preventDefault();
              editGroup(e.target.value);
            }}
          />
        </div>
        {search.selected.length === 0
          ?
          null
          :
          <div>
            <label>Invites</label>
            <ul className="inviteList">
              {selectedUserList}
            </ul>
          </div>
        }
        <div className="createGroup-input">
          <label htmlFor="search">Invite Users to the Group</label>
          <input
            id="search"
            type="text"
            placeholder="Enter a name"
            aria-hidden="true"
            autoComplete="off"
            maxLength="200"
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
      </form>
      <button
        className="btn btn-default btn-success btn-xs create"
        onClick={() => {
          createGroup(group.edit, user.id, user.facebook.name, search.selected);
          showModal();
        }}
      >
        Create
      </button>
    </div>
  );
};

createGroupModal.propTypes = {
  user: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
  selectUser: PropTypes.func.isRequired,
  deselectUser: PropTypes.func.isRequired,
};

export default createGroupModal;
