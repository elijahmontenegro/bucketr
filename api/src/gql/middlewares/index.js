const glob = require('glob');
const path = require('path');

module.exports = glob.sync(__dirname + '{/*.js,/*/index.js}')
  .filter(file => {
    return (
      file.indexOf('.') != 0 && file != __filename.replace(/\\/g, "/") && file.slice(-3) == '.js'
    );
  })
  .map(file => {
    const middleware = require(file);

    console.log(`[GRAPHQL] (${path.join('./gql/middlewares', path.relative(__dirname, file))}) graphql middleware loaded.`);
    return middleware;
  });
