var path = require('path');
var Router = require('express').Router;
var router = new Router();
var models = require('../models/index');
var annotationConstructor = require('../utils/annotationConstructor');
var listOfDocs = require('../utils/listOfDocs');

router.get('/api/athena', function(req, res) {
  res.sendFile(path.join(__dirname, '../../../build/libs/athena.js'));
});
router.post('/api/create', function(req, res) {
  console.log(req.body);
  res.end();
});

// finds or creates User
router.post('/api/users', function(req, res) {
  models.User.findOrCreate({
    where: { facebookId: req.body.facebookId, name: req.body.name }
  }).then(function(user) {
    res.json(user[0]);
  }).catch(function(err) {
    res.send(err);
  });
});

// updates a User's info
router.put('/api/users', function(req, res) {
  models.User.update({
    name: req.body.name,
    title: req.body.title
  }, {
    where: { facebookId: req.body.facebookId },
    returning: true
  }).then(function(users) {
    res.send(users[1]);
  }).catch(function(err) {
    res.send(err);
  });
});

// finds or creates Doc
router.post('/api/docs', function(req, res) {
  models.Doc.findOrCreate({
    where: { url: req.body.url, title: req.body.title }
  }).then(function(doc) {
    res.json(doc[0]);
  }).catch(function(err) {
    res.send(err);
  });
});

// creates Annotation
router.post('/api/annotations', function(req, res) {
  models.Annotation.create({
    UserId: Number(req.body.UserId),
    DocId: Number(req.body.DocId),
    url: req.body.url,
    text: req.body.text,
    source: req.body.source,
    exact: req.body.exact,
    prefix: req.body.prefix,
    suffix: req.body.suffix
  }).then(function(annotation) {
    res.send(annotation);
  }).catch(function(err) {
    res.send(err);
  });
});

// loads all Annotations for a given User
router.get('/api/annotations', function(req, res) {
  models.Annotation.findAll({
    include: [{
      model: models.User
    }],
    where: {
      UserId: req.query.UserId
    }
  }).then(function(annotations) {
    annotationConstructor(annotations, res);
  }).catch(function(err) {
    res.send(err);
  });
});

// loads Annotations for a given Doc for a given User
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

// loads Docs for a given User
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
