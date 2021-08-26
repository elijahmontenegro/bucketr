const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const AtlassianStrategy = require('passport-atlassian-oauth2');

module.exports = new AtlassianStrategy({
  clientID: process.env.ATLASSIAN_CLIENT_ID,
  clientSecret: process.env.ATLASSIAN_CLIENT_SECRET,
  callbackURL: process.env.ATLASSIAN_AUTH_CALLBACK_URL,
  scope: process.env.ATLASSIAN_AUTH_SCOPE
},
(accessToken, refreshToken, profile, cb) => {
  // optionally save profile data to db
  done(null, profile);
});
