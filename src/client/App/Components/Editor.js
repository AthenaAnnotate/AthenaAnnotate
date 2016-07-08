import React, { PropTypes } from 'react';

const Editor = ({ body,
  onCancel,
  editText,
  onSave,
  editor,
  // onDelete,
  group,
  updateGroup,
  updatePrivacy,
  privacySetting,
  groupSetting,
}) => {
  const groupList = group.groups.map(grp => (
    <li>
      <a onClick={() => updateGroup(grp.id, grp.name)}>{grp.name}</a>
    </li>
  ));
  const privacy = editor.private === true ? 'Private' : 'Public';
  const currGroup = group.groups.filter(grp => (
    grp.id === groupSetting
    ))[0];
  const currGroupName = currGroup ? currGroup.name : 'No Group';
  // const privacyValue = editor.private === undefined ? privacySetting : editor.private;
  const bodyValue = editor.body === undefined ? body : editor.body;

  return (
    <div>
      <form>
        <textarea
          className="form-control"
          defaultValue={body}
          onChange={(e) => editText(e.target.value)}
        />
        <div className="editor-btns">
          <button
            className="btn btn-primary btn-xs"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              onSave(bodyValue, editor.private, editor.group);
            }}
          >
            Save
          </button>
          <button
            className="btn btn-primary btn-xs"
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          >
            Cancel
          </button>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-default btn-xs dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"dropdown
            >
              {editor.private === undefined ? privacySetting : privacy}
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li><a onClick={() => updatePrivacy(true)}>Private</a></li>
              <li><a onClick={() => updatePrivacy(false)}>Public</a></li>
            </ul>
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-default btn-xs dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {editor.groupName === undefined ? currGroupName : editor.groupName}
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li><a onClick={() => updateGroup(null, 'No Group')}>No Group</a></li>
              {groupList}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

Editor.propTypes = {
  body: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired,
  editText: PropTypes.func.isRequired,
  editor: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  updateGroup: PropTypes.func.isRequired,
  updatePrivacy: PropTypes.func.isRequired,
  privacySetting: PropTypes.string.isRequired,
  groupSetting: PropTypes.number.isRequired,
};

export default Editor;

// <button
//   className="btn btn-default"
//   onClick={(e) => {
//     e.preventDefault();
//     onDelete();
//   }}
// >
//   Delete
// </button>
