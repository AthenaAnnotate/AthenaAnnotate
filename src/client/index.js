import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ArticlesApp from './App/Reducers';
// import * as App from './App';
import App from './App/Components/App';

const fakeArticles = [
  {
    id: 0,
    url: 'http://www.google.com',
    notes: [
      {
        id: 0,
        text: 'This is some text from the article',
        note: 'Some text here',
        edit: false,
      },
      {
        id: 1,
        text: 'This is some more text from the article',
        note: 'Some other text here',
        edit: false,
      },
    ],
  },
  {
    id: 1,
    url: 'http://www.yahoo.com',
    notes: [
      {
        id: 2,
        text: 'This is some other text from the article',
        note: 'Some more text here',
        edit: false,
      },
      {
        id: 3,
        text: 'This is some text from the article',
        note: 'Some other more text here',
        edit: false,
      },
    ],
  },
];

let store = createStore(ArticlesApp, { articles: fakeArticles });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
