const { resolver } = require('graphql-sequelize');
const { User } = require('../../../db');

module.exports = {
  Query: {
    users: resolver(User),
    user: resolver(User),
    me: resolver(User, {
      before(findOptions, args, ctx) {
        findOptions.where = {
          id: ctx.user.id,
        };
        return findOptions;
      },
    })
  },
};
