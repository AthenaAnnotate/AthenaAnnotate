import React, { PropTypes } from 'react';
import BodyEditor from '../Containers/BodyEditor';

const Annotation = (
  {
    onAnnotationDelete,
    onEditBody,
    onSaveEdit,
    onDeleteBody,
    body,
    edit,
    id,
    url,
    target,
    userName,
    userTitle,
    filter,
    userId,
    // followUser,
    user,
    // following,
    // setFilter,
    setUserDB,
    userImage,
    privacySetting,
    groupSetting,
  }
) => (
  <li className="card object annotation">
    {filter !== 'Self' && filter !== 'User' ?
      <div>
        <div
          className="circle userPic-small"
          style={{ backgroundImage: `url(${userImage})` }}
          alt={userName}
        />
        <div className="userInfo">
          <a
            className="username"
            onClick={() => {
              setUserDB(userId);
            }}
          >
            <div>{userName}</div>
          </a>
          <div className="userTitle">{userTitle}</div>
        </div>
      </div>
      : null}
    <div className="target-box">
      <blockquote className="targetQ">
        {target}
        <div className="target-btn">
          {user.id !== userId ? null :
            <div onClick={onAnnotationDelete}>
              <span className="glyphicon glyphicon-trash" aria-hidden="true" />
            </div>}
        </div>
      </blockquote>
    </div>
    <div>
    {!!body ?
      <div>
        <blockquote className="bodyQ">
          {!edit ? body : null}
          {!edit && (user.id === userId) ?
            <div className="body-btn">
              <div className="edit-btn" onClick={() => onEditBody(id)}>
                <span className="glyphicon glyphicon-pencil" />
              </div>
              <div className="delete-btn" onClick={() => onDeleteBody(id, url)}>
                <span className="glyphicon glyphicon-trash" />
              </div>
            </div>
            : null}
          {edit && (user.id === userId) ?
            <BodyEditor
              body={body}
              onCancel={() => onEditBody(id)}
              onSave={(txt, privacy, grp) => onSaveEdit(id, txt, privacy, grp, url)}
              privacySetting={privacySetting}
              groupSetting={groupSetting}
            />
            : null}
        </blockquote>
      </div>
    : null}
    </div>
  </li>
);

Annotation.propTypes = {
  onAnnotationDelete: PropTypes.func.isRequired,
  onEditBody: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  onDeleteBody: PropTypes.func.isRequired,
  body: PropTypes.string,
  edit: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userTitle: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  // followUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  // following: PropTypes.object.isRequired,
  // setFilter: PropTypes.func.isRequired,
  setUserDB: PropTypes.func.isRequired,
  userImage: PropTypes.string.isRequired,
  privacySetting: PropTypes.string.isRequired,
  groupSetting: PropTypes.number.isRequired,
};

export default Annotation;

// {user.id === userId ? null :
//   <a className="follow" onClick={() => followUser(userId, user.id)}>
//     {following.users.filter(followedUser => followedUser.id === userId).length !== 0
//     ? 'unfollow' : 'follow'}
//   </a>
// }

// onDelete={() => onDeleteBody(id, url)}
