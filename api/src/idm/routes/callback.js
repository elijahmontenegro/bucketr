const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = (express) => {
  // express.get('/auth/facebook/callback', passport.authenticate('facebook'));

  express.get('/auth/atlassian/callback', passport.authenticate('atlassian', {
      // successRedirect: process.env.FRONTEND_URL,
      failureRedirect: '/auth/atlassian/error'
    }),
    async (req, res) => {
      console.log('/auth/atlassian/callback');

      if (req.user) {
        res.setHeader('Access-Control-Allow-Credentials', 'true')

        const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
        res.cookie('jwt', token);
        return res.status(200).redirect(process.env.FRONTEND_URL);
        //  res.status(200).json({ user: req.user, token: token });
      }

      return res.sendStatus(404);
    }
  );
};
