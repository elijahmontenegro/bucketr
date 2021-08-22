const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const AtlassianStrategy = require('./atlassian');


// // Dummy serialization/desiarialization
// passport.serializeUser((user, cb) => cb(null, user));
// passport.deserializeUser((obj, cb) => cb(null, obj));
module.exports = async () => {
  // passport.use(AtlassianStrategy);
  // refresh.use(AtlassianStrategy);
  // server.use(passport.initialize());
  // server.use(passport.session());
};
