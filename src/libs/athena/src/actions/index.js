import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import * as types from '../constants/actionTypes';
import { getUserFromFB } from '../../../common/auth';

export const failedRequest = error => (
  {
    type: types.ERR_FAILED_REQUEST,
    data: error,
  }
);

// Sets state.user
export const saveUserToStore = userData => (
  {
    type: types.SAVE_USER_TO_STORE,
    data: userData,
  }
);

export const getUserFromDB = fbUser => {
  const payload = JSON.stringify(fbUser);

  return dispatch => {
    fetch('/api/users', {
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

export const login = (cb) => {
  window.FB.login(res => {
    if (res.status === 'connected') {
      getUserFromFB().then(user => cb(user));
    }
  }, { scope: 'public_profile,email' });
};

export const webAppLogin = () => (
  dispatch => (
    window.FB.login(res => {
      if (res.status === 'connected') {
        getUserFromFB().then(user => dispatch(getUserFromDB(user)));
      }
    }, { scope: 'public_profile,email' })
  )
);

export const logout = () => (
  dispatch => (
    window.FB.logout(() => (
      dispatch(saveUserToStore({
        id: null,
      }))
    ))
  )
);

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
