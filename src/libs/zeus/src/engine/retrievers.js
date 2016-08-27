// returns a string docText that contains all
// textNodes and an array of nodes that
// correspond to each substring
const parseDoc = doc => {
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
    nodes.push({ textNode: node, start: docText.length });
    // concat to allText
    docText += node.nodeValue;
    node = nodeIterator.nextNode();
  }
  return { docText, nodes };
};

export default parseDoc;
