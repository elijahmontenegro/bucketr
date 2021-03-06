const { resolver } = require('graphql-sequelize');
const db = require('../../../db');
const bcrypt = require('bcryptjs');
// const { generateValidationCode } = require('../../../utils/user');

module.exports = {
  Query: {
    users: resolver(db.User),
    user: resolver(db.User),
    me: resolver(db.User, {
      before(findOptions, args, ctx) {
        const user = ctx.getUser();
        findOptions.where = {
          id: user.id,
        };
        return findOptions;
      }
    })
  },
  Mutation: {
    async signup(root, { data }, ctx) {
      const existingEmail = await db.User.count({ where: { email: data.email } });
      if (existingEmail) {
        throw new Error('Sorry, this user already exists.');
      }

      const password = await bcrypt.hash(data.password, 10);

      const user = await db.User.create({
        ...data,
        password
      });

      // // const code = generateValidationCode();
      // // await db.Redis.set(`validate-user:${user.id}`, code);

      // await ctx.login(user);

      console.log(user);

      return user;
    },
    async login(root, { email, password }, ctx) {
      const { user, error, info } = await ctx.authenticate('graphql-local', { email, password });

      // if (!user) {npm
      //   throw new Error('Sorry, this user does not exist.');
      // }

      // if (!user.active) {
      //   throw new Error('Sorry, this user is disabled.');
      // }

      // if (!user.validated) {
      //   throw new Error('USER_IS_NOT_VALIDATED');
      // }

      await ctx.login(user);

      return {
        user
      };
    },
    async logout(root, args, { session, res, ...ctx}) {
      res.clearCookie('sid');
      return ctx.logout();
    },
    async createUser(root, { data }, ctx) {
      const existingEmail = await db.User.count({
        where: {
          email: {
            [Op.iLike]: data.email
          }
        }
      });

      if (existingEmail) {
        throw new Error('Sorry, this email is already taken.');
      }

      const user = await db.User.create(data);

      return user;
    },
    async updateUser(root, { data }, ctx) {
      const user = await db.User.update(
        {
          displayName: data.displayName,
          email: data.email,
        },
        {
          where: {
            id: data.id
          }
        }
      );

      if (!user) {
        throw new Error('User not found.');
      }

      return true;
    },
    async deleteUser(root, { id }, ctx) {
      const user = await db.User.findByPk(id);

      if (!user) {
        throw new Error('User not found.');
      }

      await user.destroy();

      return true;
    },
  },
};
