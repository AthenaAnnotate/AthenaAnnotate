import './assets/styles/styles.scss';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { IFRAME_CLASS, HIDE_IFRAME_CLASS } from './constants';
import config from '../../../../config';

const baseUrl = process.env.NODE_ENV === 'production'
              ? config.url.host
              : `${config.url.host}:${config.url.port}`;

const app = document.createElement('div');
app.id = 'app-anchor';

const iframe = document.createElement('iframe');
iframe.src = `${baseUrl}/athena/athena.html`;
iframe.id = 'athena-app';
iframe.classList.add(HIDE_IFRAME_CLASS);
iframe.classList.add(IFRAME_CLASS);

document.body.appendChild(iframe);
document.body.insertBefore(app, document.body.childNodes[0]);

render(
  <App iframe={iframe} />,
  document.getElementById('app-anchor')
);
