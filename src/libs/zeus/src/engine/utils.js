export const sanitize = str => (
  str.replace(/[\\^$.*+?()[\]]+/g, '\\$&')
);

// helper function
export const createRegQuery = selector => {
  let query = '';
  const {
    prefix,
    exact,
    suffix,
  } = selector;

  query += !!prefix ? `${sanitize(prefix)}\.?` : '';
  query += `(${sanitize(exact)})\.?`;
  query += !!suffix ? `${sanitize(suffix)}?` : '';

  return query;
};

export const getTextNodes = node => (
  document.createNodeIterator(
    node,
    NodeFilter.SHOW_TEXT,
    textNode => (
        textNode.parentElement.nodeName.toLowerCase() !== 'script' ?
            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    )
  )
);

// returns the next node,
// either the next siblingNode or the siblingNode of a parentNode
export const getNextNode = (n, f) => {
  const filter = f || (() => true);
  let node = n;
  do {
    if (!!node.childNodes.length) {
      // console.log('node has child: ', node.firstChild.data);
      node = node.firstChild;
      if (filter(node)) {
        return node;
      }
      continue;
      // return node.firstChild;
    }

    while (!!node && !node.nextSibling) {
      node = node.parentNode;
    }

    if (!node) {
      return null;
    }
    node = node.nextSibling;
  } while (!filter(node));

  return node; // .nextSibling;
};

// creates a new range
export const createRange = (startNode, endNode) => {
  const range = document.createRange();
  const { startOffset } = startNode;
  const { endOffset } = endNode;

  range.setStart(startNode.textNode, startOffset);
  range.setEnd(endNode.textNode, endOffset);

  return range;
};

export const getText = () => {
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const { startOffset } = range;
  const { endOffset } = range;

  const exact = range.cloneContents().textContent;

  const prefix = range.startContainer
                .textContent
                .substring(startOffset - 20, startOffset);

  const suffix = range.endContainer
                .textContent
                .substring(endOffset, endOffset + 20);

  return { range, selector: { exact, prefix, suffix } };
};

export const createAnnote = (selector, type, annoteId, userId) => {
  const url = window.location.href;
  // TODO: do not use annotations.length to determine
  // annotation id, will be problematic in event of an
  // annotation deletion

  // TODO: add '/' before annoteId if target.souce
  // does not end w/ a '/'
  const id = `${url}/annote${annoteId}/${userId}`;
  return {
    id,
    type,
    creator: userId,
    body: {
      lastModified: '',
      text: '',
    },
    target: {
      source: url,
      selector,
    },
  };
};

export const getAnnoteId = idString => {
  const endIdx = idString.lastIndexOf('/');
  const startIdx = idString.substring(0, endIdx)
                   .lastIndexOf('e') + 1;
  return parseInt(idString.substring(startIdx, endIdx), 10) + 1;
};
