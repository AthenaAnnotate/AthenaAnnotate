import React, { PropTypes } from 'react';
import VisibleDocList from '../Containers/VisibleDocList';
import ProfileEditor from '../Containers/ProfileEditor';

const Main = ({ profile }) => (
  profile.show ? <ProfileEditor /> : <VisibleDocList />
);

Main.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Main;
