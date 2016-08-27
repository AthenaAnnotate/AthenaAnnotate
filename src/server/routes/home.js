var path = require('path');
var Router = require('express').Router;
var router = new Router();

router.get('/api/demo', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/demo.html'));
});

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});


module.exports = router;
