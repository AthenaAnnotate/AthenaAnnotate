require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';
import config from '../../../../../config';

const baseUrl = process.env.NODE_ENV === 'production'
              ? config.url.host
              : `${config.url.host}:${config.url.port}`;

export const failedRequest = error => (
  {
    type: types.ERR_FAILED_REQUEST,
    data: error,
  }
);

export const saveUserToStore = userData => (
  {
    type: types.SAVE_USER_TO_STORE,
    data: userData,
  }
);

export const getUserFromDB = fbUser => {
  const payload = JSON.stringify(fbUser);

  return dispatch => {
    return fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Content-length': payload.length,
      },
      credentials: 'same-origin',
      body: payload,
    })
    .then(res => res.json())
    .then(res => dispatch(saveUserToStore(res)))
    .catch(err => dispatch(failedRequest(err)));
  };
};

export const setModify = (bool) => ({
  type: types.SET_WIDGET_MODIFY,
  isOnModify: bool,
});

// Updates state.annotations.body.text to given value
export const updateBody = (text) => ({
  type: types.UPDATE_BODY,
  text,
});

// Resets state.annotation to default / empty values
export const clearAnnote = () => ({
  type: types.CLEAR_ANNOTATION,
});

export const setAnnoteGroup = (groupId) => ({
  type: types.SET_GROUP,
  groupId,
});

// Sets the value for state.annotation
export const setAnnote = annote => ({
  type: types.SET_ANNOTATION,
  annote,
});

// Adds Annotation(s) to state.annotations
export const addAnnote = annote => ({
  type: types.ADD_ANNOTATION,
  annote,
});

export const setCurrentChannel = current => ({
  type: types.SET_CURRENT_CHANNEL,
  current,
});

export const setChannels = channels => ({
  type: types.SET_CHANNELS,
  channels,
});
