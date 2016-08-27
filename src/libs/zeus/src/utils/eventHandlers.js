import {
  SHOW_IFRAME_CLASS,
  HIDE_CONTROL_BUTTONS_CLASS,
} from '../constants';

import { setController, hideAthena, initNote, createHighlight } from './actors';

import { NOTE, HIGHLIGHT } from '../../../common/annoteTypes';

export const handleSelectionEvent = (context, e) => {
  const range = window.getSelection().getRangeAt(0);
  const distance = Math.abs(
    range.endOffset - range.startOffset
  );
  const display = context.state.controller;
  // IF a selection is made on mouseup
  if (distance > 0) {
    setController(context, e);
    context.hasSelection = true;
  } else {
    const classList = context.props.iframe.classList;
    if (classList.contains(SHOW_IFRAME_CLASS)) {
      hideAthena(context);
    }
    if (display !== HIDE_CONTROL_BUTTONS_CLASS) {
      context.setState({ controls: HIDE_CONTROL_BUTTONS_CLASS });
    }
    context.hasSelection = false;
  }
};

export const shortcutHandler = (context, e) => {
  if (e.getModifierState('Shift')) {
    if (e.code === 'KeyN' && context.hasSelection) {
      initNote(context, NOTE);
    } else if (e.code === 'KeyH' && context.hasSelection) {
      createHighlight(context, HIGHLIGHT);
    }
  } else if (e.code === 'Escape') {
    hideAthena(context);
  }
};


