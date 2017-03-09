module.exports = function requireRole(role) {
  return function(req, res, next) {
    var appMetadata = req.user.profile._json.app_metadata || {};
    var roles = appMetadata.roles || [];

    if (roles.indexOf(role) != -1) {
      next();
    } else {
      req.session['requiredRole'] = role;
      req.session['page'] = req.url;
      res.redirect('/unauthorized');
    }
  }
};
