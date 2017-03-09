var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var express = require('express');
var env = require('../env');
var passport = require('passport');
var requireRole = require('../requireRole');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', env: env, userId: getUserId() });

  function getUserId() {
    var user = req.session.passport && req.session.passport.user;
    return user && user.profile && user.profile.id;
  }
});

router.get('/login', function(req, res){
  res.redirect('/');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect(env.MIDAS_ACCOUNTS_URL + '/signoff?returnToUrl=' +
    encodeURIComponent(baseUrl(req)) + '&title=' + env.TITLE + '&message=Successfully logged out.'
  );

  function baseUrl(req) {
    return url.format({
      protocol: req.protocol,
      host: req.get('host')
    });
  }
});

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/url-if-something-fails'
  }), function(req, res) {
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
      page: remove(session, 'page')
  });

  function remove(session, key) {
    var result = session[key];
    delete session[key];
    return result;
  }
});


module.exports = router;
