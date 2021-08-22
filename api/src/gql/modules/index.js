const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const types = loadFilesSync(path.join(__dirname, './**/*.gql'));
const resolvers = loadFilesSync(path.join(__dirname, './**/*resolvers.*'));

module.exports = makeExecutableSchema({
  typeDefs: mergeTypeDefs(types),
  resolvers: mergeResolvers(resolvers),
});
