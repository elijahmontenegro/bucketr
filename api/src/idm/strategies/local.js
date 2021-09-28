const { GraphQLLocalStrategy } = require('graphql-passport');
const db = require('../../db');

module.exports = new GraphQLLocalStrategy(
  async (email, password, done) => {
    try {
      const { user, validLogin } = await db.User.checkPassword(email, password);
      if(!validLogin) {
        return done(new Error('Invalid email or password.'), false);
      }

      if (validLogin && !user.active) {
        return done(new Error('Sorry, this user is disabled.'), false);
      }

      return done(null, user);

    } catch (error) {
      return done(error, false);
    }
  }
);
