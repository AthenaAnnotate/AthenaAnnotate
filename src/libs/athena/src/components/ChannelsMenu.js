import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import ChannelItem from './ChannelItem';

const populateChannels = channels => (
  channels.map((channel, idx) => (
    <MenuItem key={idx} onSelect={() => { console.log(channel); }} >
      {channel.name}
    </MenuItem>
  ))
);

const ChannelsMenu = ({ user, channels }) => (
  <DropdownButton title={channels.current} id={'channel-dropdown'}>
    {populateChannels(channels.channels)}
  </DropdownButton>
);

ChannelsMenu.propTypes = {
  user: PropTypes.object,
  channels: PropTypes.object,
};

export default ChannelsMenu;


      // <ChannelItem
      //   key={idx}
      //   channel={channel}
      //   eventId={{ id: channel.id, type: channel.type }}
      //   cb={chan => { console.log('chan: ', chan); }}
      // />


