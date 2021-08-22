const { resolver } = require('graphql-sequelize');
const models = require('../../../db');

module.exports = {
  Query: {
    users: resolver(models.User),
    user: resolver(models.User),
    me: resolver(models.User, {
      before(findOptions, args, ctx) {
        findOptions.where = {
          id: ctx.user.id,
        };
        return findOptions;
      },
    })
  },
};
