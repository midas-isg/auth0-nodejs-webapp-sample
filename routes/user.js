var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var env = require('../env');
var express = require('express');
var passport = require('passport');
var requireRole = require('../requireRole');
var router = express.Router();

/* GET user profile. */
router.get('/',
  ensureLoggedIn,
  requireRole('ISG_USER'),
  function(req, res, next) {
  res.render('user', {
    user: req.user,
    env: env
  });
});


module.exports = router;
