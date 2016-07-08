import React, { PropTypes } from 'react';
import VisibleAnnotationList from '../Containers/VisibleAnnotationList';

const Doc = ({
  user,
  url,
  privacy,
  baseUrl,
  title,
  image,
  id,
  count,
  onDocDelete,
  listView,
  filter,
  updateDocPrivacy,
}) => {
  const placeholder = 'http://www.pacinno.eu/wp-content/uploads/2014/05/placeholder1.png';
  return (
    <li className="object doc">
      {listView
        ?
        <div className="media card">
          <a href={url} target="_blank">
            <div>
              <div className="media-left">
                <img
                  className="media-object docimage small"
                  src={image !== null ? image : placeholder}
                  alt="Thumbnail"
                />
              </div>
              <div className="media-body">
                <h4 className="media-heading">{title}</h4>
                <p className="url">{baseUrl}</p>
                <span className="note-count">Annotations: {count}</span>
              </div>
            </div>
          </a>
          {filter !== 'Self'
            ?
            null
            :
            <div className="closeDoc" onClick={onDocDelete}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true" />
            </div>
          }
        </div>
        :
        <div className="detail card">
          <a href={url} target="_blank">
            <div className="docInfo">
              <div className="image">
                <img
                  className="docimage large"
                  src={image !== null ? image : placeholder}
                  alt="Document"
                />
              </div>
              <div className="heading">
                <h4>{title}</h4>
                <p className="url">{baseUrl}</p>
              </div>
            </div>
          </a>
          {filter !== 'Self'
            ?
            null
            :
            <div className="closeDoc" onClick={onDocDelete}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true" />
            </div>
          }
          <VisibleAnnotationList id={id} />
          <div className="privacy">
            {filter !== 'Self'
              ?
              null
              :
              <div>
                <span>Set all annotations: </span>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default btn-xs dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {privacy ? 'Private' : 'Public'}
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a onClick={() => updateDocPrivacy(true, url, user.id)}>Private</a></li>
                    <li><a onClick={() => updateDocPrivacy(false, url, user.id)}>Public</a></li>
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </li>
  );
};

Doc.propTypes = {
  user: PropTypes.object.isRequired,
  privacy: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  count: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDocDelete: PropTypes.func.isRequired,
  listView: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  updateDocPrivacy: PropTypes.func.isRequired,
};

export default Doc;
