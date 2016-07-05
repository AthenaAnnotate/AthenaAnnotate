import React, { PropTypes } from 'react';

const Editor = ({ body, onCancel, editText, onSave, editor, onDelete, group, updateGroup, updatePrivacy }) => {
  const groupList = group.groups.map(grp => (
    <li>
      <a onClick={() => updateGroup(grp.id, grp.name)}>{grp.name}</a>
    </li>
  ));
  return (
    <div>
      <form>
        <textarea
          className="form-control"
          defaultValue={body}
          onChange={(e) => editText(e.target.value)}
        />
        <button
          className="btn btn-default"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSave(editor.body, editor.private, editor.group);
          }}
        >
          Save
        </button>
        <button
          className="btn btn-default"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          Delete
        </button>
        <button
          className="btn btn-default"
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
            className="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"d
          >
            {editor.private}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li><a onClick={() => updatePrivacy('Private')}>Private</a></li>
            <li><a onClick={() => updatePrivacy('Public')}>Public</a></li>
          </ul>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-default dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {editor.groupName}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li><a onClick={() => updateGroup()}>Only Me</a></li>
            {groupList}
          </ul>
        </div>
      </form>
    </div>
  );
};

Editor.propTypes = {
  body: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editText: PropTypes.func.isRequired,
  editor: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  updateGroup: PropTypes.func.isRequired,
  updatePrivacy: PropTypes.func.isRequired,
};

export default Editor;
