const { shield, and, or, not, allow } = require('graphql-shield');
const rules = require('./rules');

module.exports = shield(
  {
    Query: {
      me: rules.isAuthenticated,
    },
    Mutation: {
      signup: not(rules.isAuthenticated),
      login: not(rules.isAuthenticated),
      logout: rules.isAuthenticated
    },
  },
  {
    allowExternalErrors: true,
    debug: process.env.NODE_ENV !== "production",
  }
);
