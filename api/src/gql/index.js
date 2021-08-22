const { GraphQLServer } = require('graphql-yoga');
const schema = require('./modules');
const context = require('./context');
const middlewares = require('./middlewares');

module.exports = new GraphQLServer({
	schema,
	context,
	middlewares
});
