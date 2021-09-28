const passport = require('passport');

module.exports = (express) => {
  express.get('/auth/atlassian/connect', passport.authenticate('atlassian'),
    async (req, res) => {

    }
  );
}
