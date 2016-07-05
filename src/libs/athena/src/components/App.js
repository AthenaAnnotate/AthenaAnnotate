import React, { Component, PropTypes } from 'react';

import AuthPanel from '../components/AuthPanel';
import AnnotatePanel  from '../containers/AnnotatePanel';
import {
  HIDE_IFRAME,
  SHOW_IFRAME,
  CREATE_ANNOTE,
  ADD_ANNOTE,
  CREATE_HIGHLIGHT,
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
  initFB,
  getUserFromFB,
  getUserStatusFromFB,
} from '../../../common/auth';

class App extends Component {
  constructor(props) {
    super(props);

    this.channelSelectHandler = this.channelSelectHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.displayAnnote = this.displayAnnote.bind(this);
    this.sendUser = this.sendUser.bind(this);
    this.hideFrame = this.hideFrame.bind(this);
    this.createAnnote = this.createAnnote.bind(this);
    this.createHighlight = this.createHighlight.bind(this);
    this.handleMessageEvent = this.handleMessageEvent.bind(this);
    this.postMessageToParent = this.postMessageToParent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessageEvent);
    window.addEventListener('click', this.handleClickEvent);

    initFB()
      .then(() => getUserStatusFromFB())
      .then(status => {
        if (status === 'connected') {
          getUserFromFB()
            .then(user => {
              if (user) {
                this.extIntervalId = window.setInterval(() => {
                  this.postMessageToParent({ type: HAS_MOUNTED });
                }, 100);
                this.fbAcc = user;
                // this.props.actions.getUserFromDB(user);
              }
            });
        }
      });
  }

  componentWillUnmount() {
    window.removeEventListener('message');
  }

  sendUser() {
    window.clearInterval(this.extIntervalId);
    this.postMessageToParent({
      type: SEND_USER,
      user: this.fbAcc,
    });
  }

  isUserLoggedIn() {
    const { user } = this.props;
    return user && user.id;
  }

  createAnnote(annote) {
    const { actions: { setAnnote, setModify } } = this.props;
    setModify(false);
    setAnnote(annote); // set annotation
  }

  createHighlight(data) {
    if (this.isUserLoggedIn()) {
      this.props.actions.saveAnnote(data.annote);
    } else {
      console.log('[createHighlight]: user not logged in');
      this.postMessageToParent({ type: SHOW_IFRAME });
    }
  }

  postMessageToParent(action) {
    parent.postMessage(action, '*');
  }

  hideFrame() {
    this.postMessageToParent({ type: HIDE_IFRAME });
  }

  channelSelectHandler(channel) {
    // change curChannel to channel
    const { actions: { clearAnnote, setCurrentChannel } } = this.props;
    clearAnnote();
    setCurrentChannel(channel);
    this.postMessageToParent({ type: CHANGE_CHANNEL, channel });
  }

  submitHandler() {
    const { actions: { addAnnote, clearAnnote }, annotation, channels } = this.props;
    console.log('channels at submit: ', channels);
    annotation.groupId = channels.current.type === 'group' ?
      channels.current.id : null;
    const { body, groupId } = annotation;
    this.postMessageToParent({ type: MODIFY_BODY, data: { body, groupId } });
    addAnnote(annotation); // add annotation to annotations
    clearAnnote(); // rest annote to empty shape
  }

  login(cb) {
    window.FB.login(res => {
      if (res.status === 'connected') {
        getUserFromFB().then(user => cb(user));
      } else { console.log('auth fail'); }
    }, { scope: 'public_profile,email' });
  }

  loginHandler() {
  const { actions: { login } } = this.props;
    login(fbAcc => {
      this.postMessageToParent({ type: SEND_USER, user: fbAcc });
    });
  }

  deleteHandler() {
    const { annotation: { id } } = this.props;
    console.log('id: ', id);
    this.postMessageToParent({ type: DELETE_ANNOTE, annoteId: id });
  }

  displayAnnote(annoteId) {
    const { annotations, actions: { setAnnote, setModify } } = this.props;
    const annote = annotations.filter(annotation => (
        annotation.id === annoteId
      )
    );
    if (!!annote) {
      setModify(true);
      setAnnote(annote[0]);
      return annote;
    }
    // TODO: handle error in which no annotation was fetched
    return null;
  }

  // addAnnotesHander(annotes) {
  //   const { annotations, actions: { addAnnote } } = this.props;
  //   // remove all existing annotes

  //   // dispatch annotes
  // }

  handleChannels(channels) {
    // filter channels:
    // channels that have annotations, dispatch to channels
    // channels that are groups, dispatch to groups
  }

  // take action on events we know about
  handleMessageEvent(event) {
    const { actions: {
      saveUserToStore,
      addAnnote,
      setChannels,
      },
     } = this.props;
    switch (event.data.type) {
      case SEND_USER:
        return saveUserToStore(event.data.user);
      case SEND_ANNOTES:
        return addAnnote(event.data.annotes);
      case CREATE_ANNOTE:
        return this.createAnnote(event.data.annote);
      case CREATE_HIGHLIGHT:
        return this.createHighlight(event.data);
      case GET_USER:
        return this.sendUser();
      case ADD_ANNOTE:
        return addAnnote(event.data.annote);
      case DISPLAY_ANNOTE:
        return this.displayAnnote(event.data.annoteId);
      case SEND_CHANNELS:
        return setChannels(event.data.channels);
      default:
        return undefined;
    }
  }

  render() {
    // console.log('props: ', this.props);
    return (
      <div>
        {
          this.isUserLoggedIn() ?
            <AnnotatePanel
              close={this.hideFrame}
              del={this.deleteHandler}
              submit={this.submitHandler}
              channelSelect={this.channelSelectHandler}
            />
            : <AuthPanel login={this.loginHandler} close={this.hideFrame} />
        }
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  widget: PropTypes.object,
  annotation: PropTypes.object,
  annotations: PropTypes.array,
  channels: PropTypes.object,
  actions: PropTypes.object,
};

export default App;
