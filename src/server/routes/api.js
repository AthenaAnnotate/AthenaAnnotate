var path = require('path');
var Router = require('express').Router;
var router = new Router();
var models = require('../models/index');
var annotationConstructor = require('../utils/annotationConstructor');
var listOfDocs = require('../utils/listOfDocs');

router.get('/api/athena', function(req, res) {
  res.sendFile(path.join(__dirname, '../../../build/libs/athena.js'));
});

// EXTENSION - creates an annotation for a given Doc and User
router.post('/api/create', function(req, res) {
  models.Doc.findOrCreate({
    where: { url: req.body.target.source },
    raw: true
  }).then(function(doc) {
    models.Annotation.create({
      UserId: Number(req.body.creator),
      DocId: Number(doc[0].id),
      url: req.body.id,
      text: req.body.body.text,
      source: req.body.target.source,
      exact: req.body.target.selector.exact,
      prefix: req.body.target.selector.prefix,
      suffix: req.body.target.selector.suffix
    }).then(function(note) {
      models.Annotation.findAll({
        include: [{
          model: models.User
        }],
        where: { id: note.dataValues.id }
      }).then(function(annotation) {
        annotationConstructor(annotation, res);
      }).catch(function(err) {
        res.send(err);
      });
    }).catch(function(err) {
      res.send(err);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// EXTENSION - loads Annotations for a given Doc for a given User
router.get('/api/doc', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Doc
    }],
    where: {
      UserId: req.query.UserId,
      DocId: req.query.DocId
    }
  }).then(function(annotations) {
    annotationConstructor(annotations, res);
  }).catch(function(err) {
    res.send(err);
  });
});

// BOTH - updates an annotation
router.put('/api/annotations', function(req, res) {
  models.Annotation.update({
    exact: req.body.target.selector.exact,
    prefix: req.body.target.selector.prefix,
    suffix: req.body.target.selector.suffix,
    text: req.body.body.text
  }, {
    where: { url: req.body.id },
    returning: true
  }).then(function(annotations) {
    models.Annotation.findAll({
      include: [{
        model: models.User
      }],
      where: { url: annotations[1][0].dataValues.url }
    }).then(function(annotation) {
      annotationConstructor(annotation, res);
    });
  }).catch(function(err) {
    res.send(err);
  });
});

// BOTH - finds or creates User
router.post('/api/users', function(req, res) {
  models.User.findOrCreate({
    where: { facebookId: req.body.facebookId, name: req.body.name }
  }).then(function(user) {
    res.json(user[0]);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - updates a User's info
router.put('/api/users', function(req, res) {
  models.User.update({
    name: req.body.name,
    title: req.body.title
  }, {
    where: { id: req.body.id },
    returning: true
  }).then(function(users) {
    res.send(users[1]);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads all Annotations for a given User
router.get('/api/annotations', function(req, res) {
  models.Annotation.findAll({
    where: {
      UserId: req.query.UserId
    }
  }).then(function(annotations) {
    res.send(annotations);
  }).catch(function(err) {
    res.send(err);
  });
});

// WEB APP - loads Docs for a given User
router.get('/api/docs', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }],
    where: {
      UserId: req.query.UserId
    }
  }).then(function(annotations) {
    listOfDocs(annotations, res);
  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;
