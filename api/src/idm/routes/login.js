const passport = require('passport');

// const base = passport.authenticate('atlassian', { failureRedirect: '/error' });

// const redirect = passport.authenticate('atlassian');


module.exports = (express) => {
  express.get('/auth/atlassian/connect', passport.authenticate('atlassian'));
}
