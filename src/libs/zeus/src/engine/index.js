import { createRange, createAnnote, getText, getAnnoteId  } from './utils';
import { wrapAnnote, unwrapAnnote } from './actors';
import { locateAnnote } from './processors';
import parseDoc from './retrievers';

// Returns Range of retrieved annotation or null
// if the annotation could not be retrieved
function retrieveAnnote(parsedDoc, annote, cb) {
  // parse document
  const { docText, nodes } = parsedDoc;
  // determine annote's location on document
  const annoteLocation = locateAnnote(annote, docText, nodes);
  // insert annote
  if (!!annoteLocation) {
    const { startNode, endNode } = annoteLocation;
    const range = createRange(startNode, endNode);
    wrapAnnote(range, annote.id, annote.type, cb);
    return range;
  }
  return null;
}

export {
  retrieveAnnote,
  createAnnote,
  getText,
  getAnnoteId,
  wrapAnnote,
  unwrapAnnote,
  parseDoc,
};
