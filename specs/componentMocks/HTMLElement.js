import jsdom from 'jsdom';
const document = jsdom.jsdom('');
const window = document.defaultView;

export const HTMLElement = window.HTMLElement;
