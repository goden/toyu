var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shots', { title: '出車表' });
});

module.exports = router;