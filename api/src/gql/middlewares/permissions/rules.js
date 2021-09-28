const { rule, and, or, not } = require('graphql-shield');
// const { getUserEmail } = require('../../../utils');

// export const isUser = rule({ cache: 'contextual' })(
//   async (parent, args, ctx, info) => {
//     // console.log('SHIELD: IsCustomer?')

//     const email = getUserEmail(ctx)
//     return ctx.db.exists.Customer({ email })
//   },
// )

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return !!ctx.getUser();
  }
);

module.exports = {
  isAuthenticated,
};
