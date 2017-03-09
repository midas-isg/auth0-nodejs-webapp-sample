var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var requireRole = require('../requireRole');
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

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
