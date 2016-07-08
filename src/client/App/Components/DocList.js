import React, { PropTypes } from 'react';
import Doc from './Doc';

const DocList = ({ following, user, docs, onDocDelete, listView, switchView, filter, showMembers, group, updateDocPrivacy, followUser }) => {
  const docList = docs.map(doc => (
    <Doc
      key={doc.id}
      {...doc}
      user={user}
      onDocDelete={() => onDocDelete(doc.id, user.id)}
      listView={listView}
      filter={filter}
      updateDocPrivacy={updateDocPrivacy}
    />
      ));
  return (
    <div className="col-md-9">
      <button
        type="button"
        className="btn btn-default"
        aria-label="listView"
        onClick={() => switchView()}
      >
        <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
      </button>
      {filter === 'User'
        ?
        <div className="userPageHeader">
          <div className="UserInfo">
            <div
              className="circle userPic"
              style={{ backgroundImage: `url(${following.selected.picture})` }}
              alt={following.selected.name}
            />
            <div className="userProfile">
              <h4 className="name">{following.selected.name}</h4>
              {following.selected.title !== undefined
                ?
                <span className="title">{following.selected.title}</span>
                :
                null
              }
              <button
                className={following.users.filter(followedUser =>
                  followedUser.id === following.selected.id).length !== 0
              ? 'btn btn-danger follow-btn' : 'btn btn-success follow-btn'}
                onClick={() => followUser(following.selected.id, user.id)}
              >
                {following.users.filter(followedUser =>
                  followedUser.id === following.selected.id).length !== 0
              ? 'UNFOLLOW' : 'FOLLOW'}
              </button>
            </div>
          </div>
        </div>
        :
        null
      }
      {filter === 'Groups'
        ?
        <a
          onClick={() => showMembers(group.selected)}
        >
          Members
        </a>
        : null
      }
      <ul className="list-group">
        {docList}
      </ul>
    </div>
  );
};

DocList.propTypes = {
  following: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  docs: PropTypes.array.isRequired,
  onDocDelete: PropTypes.func.isRequired,
  listView: PropTypes.bool.isRequired,
  switchView: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  showMembers: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  updateDocPrivacy: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
};

export default DocList;
