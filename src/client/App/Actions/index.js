require('isomorphic-fetch');
require('es6-promise').polyfill();
import { saveUserToStore } from '../../../libs/athena/src/actions';
export * from '../../../libs/athena/src/actions';

// To load all annotations based on filter
const requestAnnotations = () => (
  {
    type: 'REQUEST_ANNOTATIONS',
  }
);

const loadAnnotations = (annotations) => (
  {
    type: 'LOAD_ANNOTATIONS',
    annotations,
  }
);

export const fetchAnnotations = (id, filter, groupId, userId) => {
  let url;
  if (filter === 'Discover') {
    url = `http://localhost:3000/api/discover?UserId=${id}`;
  } else if (filter === 'Following') {
    url = `http://localhost:3000/api/following?UserId=${id}`;
  } else if (filter === 'Groups') {
    url = `http://localhost:3000/api/group?GroupId=${groupId}`;
  } else if (filter === 'User') {
    url = `http://localhost:3000/api/user?UserId=${userId}`;
  } else {
    url = `http://localhost:3000/api/annotations?UserId=${id}`;
  }
  return dispatch => {
    dispatch(requestAnnotations());
    return fetch(url)
      .then(response => response.json())
      .then(annotations => {
        dispatch(loadAnnotations(annotations));
      });
  };
};

// To handle deletion of annotations
export const deleteAnnotation = id => (
  {
    type: 'DELETE_ANNOTATION',
    id,
  }
);

const deleteAnnotationFail = id => (
  {
    type: 'DELETE_ANNOTATION_FAIL',
    id,
  }
);

export const deleteAnnotationDB = (id, url) => (
  dispatch =>
    fetch(`http://localhost:3000/api/annotations?id=${url}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 200) {
          return dispatch(deleteAnnotation(id));
        }
        return dispatch(deleteAnnotationFail(id));
      })
);

// To handle editing of text within the annotation editor
export const editText = body => (
  {
    type: 'EDIT_TEXT',
    body,
  }
);

// To handle editing of an annotation
export const editAnnotation = id => (
  {
    type: 'EDIT_ANNOTATION',
    id,
  }
);

const saveEdit = (id, body) => (
  {
    type: 'SAVE_EDIT',
    id,
    body,
  }
);

const saveEditFail = id => (
  {
    type: 'SAVE_EDIT_FAIL',
    id,
  }
);

export const editAnnotationDB = (id, body, privacy, group, url) => (
  dispatch =>
    fetch('http://localhost:3000/api/annotations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: {
          text: body,
        },
        id: url,
        private: privacy,
        groupId: group,
      }),
    })
      .then(response => response.json())
      .then(annotation => {
        if (Array.isArray(annotation)) {
          return dispatch(saveEdit(id, body));
        }
        return dispatch(saveEditFail(id));
      })
);

// To handle deletion of annotations from the DB
const deleteBody = id => (
  {
    type: 'DELETE_BODY',
    id,
  }
);

const deleteBodyFail = id => (
  {
    type: 'DELETE_BODY_FAIL',
    id,
  }
);

export const deleteBodyDB = (id, url) => (
  dispatch =>
    fetch('http://localhost:3000/api/annotations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: { text: null },
        id: url,
      }),
    })
      .then(response => response.json())
      .then(message => {
        if (Array.isArray(message)/* deleted */) {
          return dispatch(deleteBody(id));
        }
        return dispatch(deleteBodyFail(id));
      })

);

// To handle deletion of doc for a specific user
const deleteDocFail = id => (
  {
    type: 'DELETE_DOC_FAIL',
    id,
  }
);

export const deleteDoc = id => (
  {
    type: 'DELETE_DOC',
    id,
  }
);

export const deleteDocDB = (docId, userId) => (
  dispatch =>
    fetch(`http://localhost:3000/api/docs?UserId=${userId}&&DocId=${docId}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.status === 200) {
        return dispatch(deleteDoc(docId));
      }
      return dispatch(deleteDocFail(docId));
    })
);

// To handle switching between list and detail card views
export const switchView = () => (
  {
    type: 'SWITCH_VIEW',
  }
);

// To handle following a user
const toggleFollowUser = (userId) => (
  {
    type: 'TOGGLE_FOLLOW_USER',
    userId,
  }
);

export const followUser = (userId, id) => (
  dispatch =>
    fetch('http://localhost:3000/api/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        userId,
      }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.UserId) {
          dispatch(toggleFollowUser(userId));
        } else {
          console.log('failure!');
        }
      })
);

// To handle loading followers
const loadFollowing = (following) => (
  {
    type: 'LOAD_FOLLOWING',
    following,
  }
);

export const loadFollowingDB = (id) => (
  dispatch =>
    fetch(`http://localhost:3000/api/follow?UserId=${id}`)
      .then(response => response.json())
      .then(users => {
        dispatch(loadFollowing(users));
      })
      .catch(err => console.log(err))
);

// To handle loading groups
const loadGroups = (groups) => (
  {
    type: 'LOAD_GROUPS',
    groups,
  }
);

export const loadGroupsDB = (userId) => (
  dispatch =>
    fetch(`http://localhost:3000/api/groups?UserId=${userId}`)
    .then(response => response.json())
    .then(groups => {
      dispatch(loadGroups(groups));
    })
    .catch(err => console.log(err))
);

// To show a list of Groups a User is a part of
export const showGroups = () => (
  {
    type: 'SHOW_GROUPS',
  }
);

// To leave a Group
export const leaveGroupDB = (groupId, userId) => (
  dispatch =>
    fetch(`http://localhost:3000/api/groups?UserId=${userId}&&GroupId=${groupId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(groups => {
        dispatch(loadGroups(groups));
      })
      .catch(err => console.log(err))
);

// To handle selecting a certain Group
export const setGroup = (groupId) => (
  {
    type: 'SET_GROUP',
    groupId,
  }
);

// To handle creating a group
export const createGroup = (name, userId, userName, otherUsersArray) => (
  dispatch =>
    fetch('http://localhost:3000/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        UserId: userId,
        creator: userName,
        otherUsersArray,
      }),
    })
    .then(response => response.json())
    .then(message => {
      // console.log(message);
      // if message is error --> return error
      if (message === 'Group Already Exists!') {
        // TODO: handle if Group already exists
        // window.alert('Group Already Exists!');
      } else {
        dispatch(loadGroupsDB(userId));
      }
    })
    .catch(err => console.log(err))
);

// To handle editing a group name
export const editGroup = (edit) => (
  {
    type: 'EDIT_GROUP_NAME',
    edit,
  }
);

// To handle modals
export const showModal = () => (
  {
    type: 'SHOW_MODAL',
  }
);

const setModal = (modal) => (
  {
    type: 'SET_MODAL',
    modal,
  }
);

// To handle creating a group
export const createNewGroup = () => (
  dispatch => {
    dispatch(setModal('createGroup'));
    dispatch(showModal());
  }
);

export const loadProfile = () => (
  {
    type: 'LOAD_PROFILE',
  }
);

export const exitProfile = () => (
  {
    type: 'EXIT_PROFILE',
  }
);

const loadUserSearchResults = (users) => (
  {
    type: 'LOAD_SEARCH_USERS',
    users,
  }
);

export const searchUsers = (query, user) => (
  dispatch => {
    if (query.length < 1) {
      dispatch(loadUserSearchResults([]));
    } else {
      fetch(`http://localhost:3000/api/search/users?user=${user}&&name=${query}`)
      .then(response => response.json())
      .then(users => {
        dispatch(loadUserSearchResults(users.slice(0, 10)));
      });
    }
  }
);

export const selectUser = (name) => (
  {
    type: 'SELECT_USER',
    name,
  }
);

export const deselectUser = name => (
  {
    type: 'DESELECT_USER',
    name,
  }
);

// To handle loading all Invites for a User
const loadInvites = invitesArray => (
  {
    type: 'LOAD_INVITES',
    invitesArray,
  }
);

export const updateInvites = (userId) => (
  dispatch =>
    fetch(`http://localhost:3000/api/invites?user=${userId}`)
    .then(response => response.json())
    .then(invites => {
      dispatch(loadInvites(invites));
    })
);

// To handle removing an Invite after interacting with it
const removeInvites = groupId => (
  {
    type: 'REMOVE_INVITES',
    groupId,
  }
);

export const acceptInvite = (groupId, userId, accept) => (
  dispatch =>
    fetch('http://localhost:3000/api/groups/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        GroupId: groupId,
        UserId: userId,
        accept,
      }),
    })
    .then(response => response.json())
    .then(() => {
      dispatch(removeInvites(groupId));
      dispatch(loadGroupsDB(userId));
    })
);

// To handle showing members of a group
const loadMembers = (info) => (
  {
    type: 'SHOW_INFO',
    info,
  }
);

export const showMembers = (groupId) => (
  dispatch => {
    dispatch(setModal('members'));
    return fetch(`http://localhost:3000/api/groups/members?GroupId=${groupId}`)
    .then(response => response.json())
    .then(members => {
      dispatch(loadMembers(members));
      dispatch(showModal());
    });
  }
);

export const setUser = (userId) => (
  {
    type: 'SET_USER',
    userId,
  }
);

// To handle changing of privacy settings
export const updatePrivacy = (privacy) => (
  {
    type: 'UPDATE_PRIVACY',
    privacy,
  }
);

// To handle changing of group for annotation
export const updateGroup = (groupId, groupName) => (
  {
    type: 'UPDATE_GROUP',
    groupId,
    groupName,
  }
);

const clearSearch = () => (
  {
    type: 'CLEAR_SEARCH',
  }
);

export const inviteUsers = (otherUsersArray, groupId, userName) => (
  dispatch =>
    fetch('http://localhost:3000/api/groups/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        GroupId: groupId,
        creator: userName,
        otherUsersArray,
      }),
    })
    .then(() => {
      dispatch(clearSearch());
    })
);

export const updateTitle = (title) => (
  {
    type: 'UPDATE_TITLE',
    title,
  }
);

export const updateName = (name) => (
  {
    type: 'UPDATE_NAME',
    name,
  }
);

export const updateProfile = (name, title, id) => (
  dispatch =>
    fetch('http://localhost:3000/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        title,
        id,
      }),
    })
    .then(response => response.json())
    .then(updatedProfile => {
      dispatch(saveUserToStore(updatedProfile));
    })
    .catch(error => console.log(error))
);

// To handle switching between different lists
const changeFilter = filter => (
  {
    type: 'FILTER',
    filter,
  }
);

export const setFilter = filter => (
  dispatch => {
    dispatch(changeFilter(filter));
    dispatch(exitProfile());
  }
);
