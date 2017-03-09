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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env });
});

router.get('/login',
  function(req, res){
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/url-if-something-fails'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });

router.get('/admin',
  ensureLoggedIn,
  requireRole('ISG_ADMIN'),
  function(req, res) {
    res.render('admin');
  });

router.get('/unauthorized', function(req, res) {
    var session = req.session;
    res.render('unauthorized', {env: env,
        requiredRole: remove(session, 'requiredRole'),
        page: remove(session, 'page')});

    function remove(session, key) {
        var result = session[key];
        delete session[key];
        return result;
    }
});


module.exports = router;
