import {
  getNextNode,
  createRange,
  createRegQuery,
} from './utils';

const getEndNode = (node, len) => {
  let curLen;
  let remLen = len - (node.textNode.length - node.startOffset);
  let curNode = getNextNode(node.textNode, targetNode => targetNode.nodeType === 3);
  while (!!curNode && remLen > 0) {
    curLen = curNode.length;

    if (remLen - curLen <= 0) {
      return {
        textNode: curNode,
        endOffset: remLen,
      };
    }
    remLen -= curLen;
    curNode = getNextNode(curNode, targetNode => targetNode.nodeType === 3);
  }
  return {
    textNode: node.textNode,
    endOffset: len,
  };
};

// sorts the given nodes by a given property
// returns two collections
// 1. sorted nodes (sorted)
// 2. instances of the sorting properties (ref)
const sortNodesBy = (nodes, prop) => {
  const ref = new Map();
  const sorted = {};
  let sortedBy;
  let key;

  nodes.forEach(node => {
    sortedBy = node[prop];
    if (ref.has(sortedBy)) {
      key = ref.get(sortedBy);
      sorted[key].push(node);
    } else {
      key = ref.size;
      ref.set(sortedBy, key);
      sorted[key] = [node];
    }
  });
  return { sorted, ref };
};

// returns all of the nodes within a given range
const getRangeNodes = range => { // TODO: add filter arg
  let node = range.startContainer;
  const endNode = range.endContainer;
  const nodes = [];
  if (node === endNode) {
    return node;
  }

  while (!!node && node !== endNode) {
    nodes.push(node);
    node = getNextNode(node);
  }
  nodes.push(endNode);

  return nodes;
};

// creates and wraps a new range around each set of childNodes
// within the given range
export const createSubRanges = (range, cb) => {
  let newRange;
  let startNode;
  let endNode;
  const ranges = [];
  const textNodes = getRangeNodes(range).filter(node => node.nodeType === 3);
  const { sorted } = sortNodesBy(textNodes, 'parentNode');

  Object.keys(sorted).reduce((result, key) => {
    result.push(sorted[key]);
    return result;
  }, [])
  .forEach((nodes, idx, collection) => {
    startNode = nodes[0];
    endNode = nodes[nodes.length - 1];
    if (idx === 0) { // handle first range
      newRange = createRange(
        { textNode: startNode, startOffset: range.startOffset },
        { textNode: endNode, endOffset: endNode.textContent.length }
      );
    } else if (idx === collection.length - 1) { // handle last range
      newRange = createRange(
        { textNode: startNode, startOffset: 0 },
        { textNode: endNode, endOffset: range.endOffset }
      );
    } else {
      newRange = createRange(
        { textNode: startNode, startOffset: 0 },
        { textNode: endNode, endOffset: endNode.textContent.length }
      );
    }
    cb(newRange);
    ranges.push(newRange);
  });
  return ranges;
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
  if (!!match) {
    const matchIdx = match.index + selector.prefix.length;
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

        startNode.startOffset = matchIdx - startNode.start; // + selector.prefix.length;
        // IF match spans multiple nodes find the endNode
        // ELSE, endNode is the same node as startNode

        endNode = matchIdx + match[1].length > startNode.start + nodeLen ?
          getEndNode(startNode, match[1].length) :
        {
          textNode: startNode.textNode,
          endOffset: startNode.startOffset + match[1].length,
        };
        return ({ startNode, endNode });
      }
    }
  }
  console.log('no match');
  return null;
};
