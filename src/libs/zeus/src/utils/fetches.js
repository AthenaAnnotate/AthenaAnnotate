import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import { checkStatus, createPOST } from './fetch';
import * as options from '../constants/fetchOptions';

const baseUrl = `https://${process.env.ATHENA_HOST}:${process.env.HTTPS_PORT}`;

export const saveAnnote = (annote) => {
  console.log(options.API_CREATE);
  fetch(
    options.API_CREATE,
    createPOST(annote)
  )
  .then(checkStatus);
};

export const fetchUser = (fbAcc) => {
  const payload = JSON.stringify(fbAcc);

  return fetch(`${baseUrl}/api/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Content-length': payload.length,
    },
    credentials: 'same-origin',
    body: payload,
  })
  .then(checkStatus)
  .then(res => res.json());
};

export const fetchAnnotes = (user) => {
  const source = window.location.href;
  const query = `${baseUrl}/api/doc?UserId=${user.id}&&source=${source}`;

  return fetch(query)
    .then(res => res.json());
};

export const fetchDelete = (annoteId) => {
  const query = `${baseUrl}/api/annotations?id=${annoteId}`;
  // const query = options.API_DELETE + annoteId;

  return fetch(query, { method: 'DELETE' }).then(checkStatus);
};
