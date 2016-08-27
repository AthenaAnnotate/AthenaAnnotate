import {
  HIDE_IFRAME_CLASS,
  SHOW_IFRAME_CLASS,
  HIDE_CONTROL_BUTTONS_CLASS,
  SHOW_CONTROL_BUTTONS_CLASS,
} from '../constants';
import { HIGHLIGHT } from '../../../common/annoteTypes';
import { CREATE_ANNOTE, DISPLAY_ANNOTE, ADD_ANNOTE } from '../../../common/messageTypes';
import { createAnnote, wrapAnnote, unwrapAnnote, getText } from '../engine';
import { fetchDelete, saveAnnote } from './fetches';

export const setControllerStyles = () => {
  const controller = document.querySelector('.controller');
  const shadow = controller.createShadowRoot();
  shadow.innerHTML += '<style> button { background-color: red; }</style>';
};

export const setController = (context, e) => {
  const top = context.mouseDownPos < e.clientX ?
    `${window.scrollY + e.clientY + 15}px` : `${window.scrollY + e.clientY - 60}px`;
  // const top = `${window.scrollY + e.clientY + 15}px`;
  const left = `${window.scrollX + e.clientX - 37}px`;
  return context.setState({
    controls: SHOW_CONTROL_BUTTONS_CLASS,
    pos: {
      top,
      left,
    },
  });
};

export const showAthena = context => {
  const classList = context.props.iframe.classList;
  if (classList.contains(HIDE_IFRAME_CLASS)) {
    classList.remove(HIDE_IFRAME_CLASS);
    classList.add(SHOW_IFRAME_CLASS);
  }
};

export const hideAthena = context => {
  const classList = context.props.iframe.classList;
  if (classList.contains(SHOW_IFRAME_CLASS)) {
    classList.remove(SHOW_IFRAME_CLASS);
    classList.add(HIDE_IFRAME_CLASS);
  }
};

// displays annote on DOM
export const initNote = (context, annoteType) => {
  showAthena(context);
  if (context.isUserLoggedIn()) {
    const { selector, range } = getText();
    const annote = createAnnote(selector, annoteType, context.annoteId, context.user.id);
    context.annote = annote;
    context.postMessageToFrame({ type: CREATE_ANNOTE, annote });
    wrapAnnote(range, annote.id, annoteType, () => {
      context.postMessageToFrame({ type: DISPLAY_ANNOTE, annoteId: annote.id });
      showAthena(context);
    });
    context.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
  }
};

// add appended notes to annotation object and sends to server
export const createNote = (context, data) => {
  // type: 'NOTE' or 'HIGHLIGHT_NOTE'
  const { body, groupId } = data;
  context.annote = Object.assign({}, context.annote, {
    body,
    groupId,
  });
  saveAnnote(context.annote);
  hideAthena(context);
};


// displays annote on DOM and creates annote
export const createHighlight = context => {
  if (context.isUserLoggedIn()) {
    context.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    const { selector, range } = getText();
    // type: 'HIGHLIGHT'
    const annote = createAnnote(selector, HIGHLIGHT, context.annoteId, context.user.id);

    saveAnnote(annote); // POST annote to server to be stored in db
    context.postMessageToFrame({ type: ADD_ANNOTE, annote });

    wrapAnnote(range, annote.id, HIGHLIGHT, () => {
      context.postMessageToFrame({ type: DISPLAY_ANNOTE, annoteId: annote.id });
      showAthena(context);
    });

    context.annoteId++; // TODO: move into createAnnote
  } else {
    showAthena(context);
  }
};

export const deleteAnnote = annoteId => {
  fetchDelete(annoteId);
  unwrapAnnote(annoteId);
};

