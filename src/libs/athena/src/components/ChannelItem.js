import React, { PropTypes } from 'react';
import { MenuItem } from 'react-bootstrap';

const channelItem = (channel, eventId, cb) => (
  <MenuItem eventKey="eventId" onSelect={cb}>
    {channel}
  </MenuItem>
);

channelItem.propTypes = {

};

export default channelItem;
