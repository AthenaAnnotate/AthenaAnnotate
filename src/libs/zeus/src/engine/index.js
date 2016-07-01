import Athena from './element';


// helper function
const createRegQuery = selector => {
  let query = '';
  const {
    prefix,
    exact,
    suffix,
  } = selector;

  query += !!prefix ? `${prefix}\.?` : '';
  query += `(${exact})\.?`;
  query += !!suffix ? `${suffix}?` : '';

  return query;
};

const getEndNode = (node, len) => {
  let curLen;
  let remLen = len - node.textNode.length;
  let curNode = node.textNode.nextSibling;
  while (!!curNode) {
    curLen = curNode.nodeType === 3 ?
      curNode.length :
      curNode.textContent.length;

    if (remLen - curLen <= 0) {
      return {
        textNode: curNode,
        endOffset: remLen + 1,
      };
    }
    remLen -= curLen;
    curNode = curNode.nextSibling;
  }
  return {
    textNode: node.textNode,
    endOffset: remLen,
  };
};

// returns a string docText that contains all
// textNodes and an array of nodes that
// correspond to each substring
export const parseDoc = doc => {
  let docText = '';
  let node;
  const nodes = [];
  const nodeIterator = document.createNodeIterator(
    doc,
    NodeFilter.SHOW_TEXT,
    textNode => (
        textNode.parentElement.nodeName.toLowerCase() !== 'script' ?
            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      )
    );
  // iterate over each node
  node = nodeIterator.nextNode();
  while (!!node) {
    // create node object
    nodes.push(
      {
        textNode: node,
        start: docText.length,
      }
    );
    // concat to allText
    docText += node.nodeValue;
    node = nodeIterator.nextNode();
  }
  return {
    docText,
    nodes,
  };
};

export const wrapAnnote = (range, annoteId, cb) => {
  const athena = new Athena;
  athena.addListener(cb);
  athena.addDataProp('id', annoteId);
  range.surroundContents(athena);
  range.detach();
  return range;
};

export const unwrapAnnote = (annoteId) => {
  // target node
  const node = document.querySelector(`[data-id='${annoteId}']`);
  const { parentNode, nextSibling } = node;
  // get node's content
  const content = node.textContent;
  const textNode = document.createTextNode(content);
  // remove node
  parentNode.removeChild(node);
  // nextNode.insertBefore(content)
  parentNode.insertBefore(textNode, nextSibling);
};

export const createRange = (startNode, endNode) => {
  const range = document.createRange();
  const { startOffset } = startNode;
  const { endOffset } = endNode;

  range.setStart(startNode.textNode, startOffset);
  range.setEnd(endNode.textNode, endOffset);

  return range;
};

// returns range
// wraps the selected text in a custom
// html element
export const insertAnnote = (startNode, endNode, cb) => {
  const range = createRange(startNode, endNode);
  wrapAnnote(range, cb);
  return range;
};

// should return the location of a given
// annote within a given node
export const locateAnnote = (annote, docText, nodes) => {
  // const { docText, nodes } = parseDoc(doc);
  let startNode;
  let endNode;
  let nodeLen;

  const { selector } = annote.target;
  const regQuery = createRegQuery(selector);

  // find index in document text where match starts
  const reg = new RegExp(regQuery, 'g');
  const match = reg.exec(docText);
  // IF match, find the match's corresponding node(s)
  if (match) {
    const matchIdx = match.index;
    for (let i = 0; i < nodes.length; i++) {
      startNode = nodes[i];
      nodeLen = startNode.textNode.nodeValue.length;

      if (!!matchIdx) {
        if (matchIdx >= startNode.start + nodeLen) {
          continue;
        }

        if (matchIdx < startNode.start) {
          break;
        }

        startNode.startOffset =
        (matchIdx - startNode.start) + selector.prefix.length;
        // IF match spans multiple nodes find the endNode
        // ELSE, endNode is the same node as startNode

        endNode = matchIdx + match[1].length > startNode.start + nodeLen ?
          getEndNode(startNode, match[1].length) :
        {
          textNode: startNode.textNode,
          endOffset: startNode.startOffset + match[1].length,
        };
        return ({ startNode, endNode });
        // insertAnnote(startNode, endNode, selector.prefix, match);
      }
      // TODO: Handle case inwhich an annotation cannot be retrieved
      console.log('no match');
      return null;
    }
  }
};

// Returns Range of retrieved annotation or null
// if the annotation could not be retrieved
export function retrieveAnnote(doc, annote, cb) {
  // parse document
  const { docText, nodes } = parseDoc(doc);
  // determine annote's location on document
  const annoteLocation = locateAnnote(annote, docText, nodes);
  // insert annote
  if (!!annoteLocation) {
    const { startNode, endNode } = annoteLocation;
    const range = createRange(startNode, endNode);
    wrapAnnote(range, annote.id, cb);
    return range;
    // return insertAnnote(startNode, endNode, cb);
  }
  return null;
}
