import React, { PropTypes } from 'react';
import { MenuItem } from 'react-bootstrap';

const ChannelItem = (channel, eventId, cb) => (
  <MenuItem eventKey={eventId} onSelect={(chan) => { console.log(chan); }}>
    {channel}
  </MenuItem>
);

ChannelItem.propTypes = {
  channel: PropTypes.object,
  eventId: PropTypes.object,
  cb: PropTypes.func.isRequired,
};

export default ChannelItem;
