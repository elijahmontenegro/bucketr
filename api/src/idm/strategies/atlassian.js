const AtlassianStrategy = require('passport-atlassian-oauth2');

module.exports = new AtlassianStrategy(
  {
    clientID: process.env.ATLASSIAN_CLIENT_ID,
    clientSecret: process.env.ATLASSIAN_CLIENT_SECRET,
    callbackURL: process.env.ATLASSIAN_CALLBACK_URL,
    scope: process.env.ATLASSIAN_SCOPE
  },
  (accessToken, refreshToken, profile, next) => {
    // optionally save profile data to db
    next(null, { user: profile });
  }
);
