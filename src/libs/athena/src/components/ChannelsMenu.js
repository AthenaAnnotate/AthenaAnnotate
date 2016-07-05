import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const populateChannels = (channels, channelSelect) => (
  channels.map((channel, idx) => (
    <MenuItem key={idx} onSelect={() => { channelSelect(channel); }} >
      {channel.name}
    </MenuItem>
  ))
);

const ChannelsMenu = ({ channels, channelSelect }) => (
  <DropdownButton title={channels.current} id={'channel-dropdown'}>
    {populateChannels(channels.channels, channelSelect)}
  </DropdownButton>
);

ChannelsMenu.propTypes = {
  user: PropTypes.object,
  channels: PropTypes.object,
  channelSelect: PropTypes.func,
};

export default ChannelsMenu;
