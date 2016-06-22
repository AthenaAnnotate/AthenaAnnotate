var models = require('../models/index');

// To query database for all docs that the user has annotations for
module.exports = function(annotations, res) {
  var docIds = [];
  annotations.forEach(function(annotation) {
    docIds.push(annotation.DocId);
  });

  models.Doc.findAll({
    where: {
      id: {
        $in: docIds
      }
    }
  }).then(function(docs) {
    res.send(docs);
  }).catch(function(err) {
    res.send(err);
  });
};
