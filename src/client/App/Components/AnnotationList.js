import React, { PropTypes } from 'react';
import Annotation from './Annotation';

const AnnotationList = (
  {
    id,
    annotations,
    onAnnotationDelete,
    onEditBody,
    onSaveEdit,
    onDeleteBody,
    filter,
    followUser,
    user,
    following,
    setFilter,
    setUserDB,
  }
) => {
  const Annotations = annotations.filter(annotation => id === annotation.doc_id);
  const annotationList = Annotations.map(annotation => (
    <Annotation
      key={annotation.id}
      {...annotation}
      onAnnotationDelete={() => onAnnotationDelete(annotation.id, annotation.url)}
      onEditBody={onEditBody}
      onSaveEdit={onSaveEdit}
      onDeleteBody={onDeleteBody}
      filter={filter}
      followUser={followUser}
      user={user}
      following={following}
      setFilter={setFilter}
      setUserDB={setUserDB}
    />
  ));
  return (
    <ul className="AnnotationList">
      {annotationList}
    </ul>
  );
};

AnnotationList.propTypes = {
  user: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  onAnnotationDelete: PropTypes.func.isRequired,
  onEditBody: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  onDeleteBody: PropTypes.func.isRequired,
  annotations: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  followUser: PropTypes.func.isRequired,
  following: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  setUserDB: PropTypes.func.isRequired,
};

export default AnnotationList;

