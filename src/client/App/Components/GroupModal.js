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
      <a onClick={() => deselectUser(u)}>
      {u}
      </a>
    </li>
  ));
  return (
    <div>
      <p>Create a new group</p>
      <input
        type="text"
        placeholder="Group Name"
        onChange={(e) => {
          e.preventDefault();
          editGroup(e.target.value);
        }}
      />
      <form>
        <label htmlFor="search">Search for users</label>
        <input
          id="search"
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
      </form>
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
      <button
        className="btn btn-default"
        onClick={() => {
          createGroup(group.edit, user.id, user.facebook.name, search.selected);
          showModal();
        }}
      >
        Create
      </button>
      <button className="btn btn-default" onClick={() => showModal()}>Cancel</button>
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
