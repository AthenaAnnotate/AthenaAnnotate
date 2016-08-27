import React, { PropTypes, Component } from 'react';
import {
  SHOW_IFRAME,
  HIDE_IFRAME,
  HAS_MOUNTED,
  GET_USER,
  SEND_USER,
  SEND_ANNOTES,
  MODIFY_BODY,
  DELETE_ANNOTE,
  DISPLAY_ANNOTE,
  SEND_CHANNELS,
  CHANGE_CHANNEL,
} from '../../../common/messageTypes';
import {
  fetchUser,
  fetchChannels,
  fetchAnnotes,
  fetchGroupAnnotes,
  fetchDelete,
} from '../utils/fetches';
import {
  handleSelectionEvent,
  shortcutHandler,
  hideAthena,
  showAthena,
  initNote,
  createNote,
  createHighlight,
  deleteAnnote,
} from '../utils';
import {
  retrieveAnnote,
  getAnnoteId,
  unwrapAnnote,
  parseDoc,
 } from '../engine';
import { NOTE } from '../../../common/annoteTypes';
import { HIDE_CONTROL_BUTTONS_CLASS } from '../constants';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: HIDE_CONTROL_BUTTONS_CLASS,
      pos: {
        top: 0,
        left: 0,
      },
    };

    this.changeChannelHandler = this.changeChannelHandler.bind(this);
    this.getChannels = this.getChannels.bind(this);
    this.setUser = this.setUser.bind(this);
    this.postMessageToFrame = this.postMessageToFrame.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);

    this.annote = null; // TODO: necessary?
    this.annoteId = null;
    this.user = null;
    this.getUserIntevalId = null;
    this.hasSelection = false;
    this.mouseDownPos = null;
    this.parsedDoc = parseDoc(document.body);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessageEvent);
    window.addEventListener('keydown', e => { shortcutHandler(this, e); });
    window.addEventListener('mousedown', e => {
      this.mouseDownPos = e.clientX;
    });
    window.addEventListener('mouseup', e => { handleSelectionEvent(this, e); });
  }


  componentWillUnmount() {
    window.removeEventListener('message');
    window.removeEventListener('keydown');
    document.removeEventListener('mouseup');
  }

  setUser(fbAcc) {
    return fetchUser(fbAcc)
      .then(user => {
        this.user = user;
        this.postMessageToFrame({ type: SEND_USER, user });
        return user;
      });
  }

  getChannels() {
    fetchChannels(this.user.id)
    .then(channels => {
      const user = {
        id: this.user.id,
        name: this.user.facebook.name,
        type: 'user',
      };
      channels.push(user);
      this.postMessageToFrame({ type: SEND_CHANNELS, channels: { current: user, channels } });
    });
  }

  initialLoad(fbAcc) { // TODO: change name to onSignIn ?
    this.setUser(fbAcc)
      .then(user => {
        fetchAnnotes(user)
          .then(annotes => {
            console.log(annotes);
            if (!!annotes.length) {
              this.annoteId = getAnnoteId(annotes[annotes.length - 1].id);
              annotes.forEach(annote => {
                retrieveAnnote(this.parsedDoc, annote, () => {
                  this.postMessageToFrame({ type: DISPLAY_ANNOTE, annoteId: annote.id });
                  showAthena(this);
                });
              });
              this.postMessageToFrame({ type: SEND_ANNOTES, annotes });
            } else {
              this.annoteId = 0;
            }
            this.getChannels();
          });
      });
  }

  isUserLoggedIn() {
    const { user } = this;
    return user && user.id;
  }

  handleMessageEvent(event) {
    switch (event.data.type) {
      case HIDE_IFRAME:
        return hideAthena(this);
      case SHOW_IFRAME:
        return showAthena(this);
      case HAS_MOUNTED:
        return this.postMessageToFrame({ type: GET_USER });
      case SEND_USER:
        return this.initialLoad(event.data.user);
      case MODIFY_BODY:
        return createNote(this, event.data.data);
      case DELETE_ANNOTE:
        return deleteAnnote(event.data.annoteId);
      case CHANGE_CHANNEL:
        return  this.changeChannelHandler(event.data.channel);
      default:
        return null;// noop , need to return some value
    }
  }

  postMessageToFrame(action) {
    this.props.iframe.contentWindow.postMessage(action, '*');
  }

  // removes all annotations on DOM, loads annotations from dif collection / channel
  swapAnnotes(annotes) {
    document.querySelectorAll('athena-annote')
      .forEach(annote => {
        unwrapAnnote(annote);
      });

    annotes.forEach(annote => {
      retrieveAnnote(document.body, annote, () => {
        this.postMessageToFrame({ type: DISPLAY_ANNOTE, annoteId: annote.id });
        showAthena(this);
      });
    });

    this.postMessageToFrame({ type: SEND_ANNOTES, annotes });
    return annotes;
  }

  changeChannelHandler(channel) {
    if (channel.type === 'group') {
      // fetch group's annotes for this doc
      fetchGroupAnnotes(channel.id)
      .then(annotes => {
        this.swapAnnotes(annotes);
      });
      return;
    }
    if (channel.type === 'user') {
      // fetch user's annotes for this doc
      fetchAnnotes(channel)
      .then(annotes => { this.swapAnnotes(annotes); });
      return;
    }
      // handle error
    console.log('incorrect channel type passed-in');
    return;
  }

  deleteAnnote(annoteId) {
    fetchDelete(annoteId);
    unwrapAnnote(annoteId);
  }

  render() {
    const controllerPos = { top: this.state.pos.top, left: this.state.pos.left };

    return (
      <div className={`${this.state.controls} btnContainer`} style={controllerPos}>

        <button
          className="fa fa-pencil control-btn control-btn-default control-btn-left"
          onClick={() => { initNote(this, NOTE); }}
        ></button>

        <button
          className="fa fa-paint-brush control-btn control-btn-default control-btn-right"
          onClick={() => { createHighlight(this); }}
        ></button>

      </div>
    );
  }
}

App.propTypes = {
  iframe: PropTypes.object.isRequired,
};

export default App;
